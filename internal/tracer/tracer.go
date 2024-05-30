package tracer

import (
	"context"
	"fmt"
	"net/http"

	"go.opentelemetry.io/otel"
	"go.opentelemetry.io/otel/attribute"
	"go.opentelemetry.io/otel/exporters/otlp/otlptrace"
	"go.opentelemetry.io/otel/exporters/otlp/otlptrace/otlptracegrpc"
	"go.opentelemetry.io/otel/propagation"
	"go.opentelemetry.io/otel/sdk/resource"
	sdktrace "go.opentelemetry.io/otel/sdk/trace"
	semconv "go.opentelemetry.io/otel/semconv/v1.4.0"
	"go.opentelemetry.io/otel/trace"
)

type Config struct {
	ExcludedRoutes map[string]struct{}
	ServiceName    string
	Host           string
	Probability    float64
}

func InitTracing(cfg Config) (*sdktrace.TracerProvider, error) {
	exporter, err := otlptrace.New(
		context.Background(),
		otlptracegrpc.NewClient(
			otlptracegrpc.WithInsecure(),
			otlptracegrpc.WithEndpoint("172.17.0.1:4317"),
		),
	)

	if err != nil {
		return nil, fmt.Errorf("creating OTLP exporter: %w", err)
	}

	resource := resource.NewWithAttributes(
		semconv.SchemaURL,
		semconv.ServiceNameKey.String(cfg.ServiceName),
	)

	traceProvider := sdktrace.NewTracerProvider(
		sdktrace.WithSampler(newEndpointExcluder(cfg.ExcludedRoutes, cfg.Probability)),
		sdktrace.WithBatcher(exporter),
		sdktrace.WithResource(resource),
	)

	otel.SetTracerProvider(traceProvider)

	otel.SetTextMapPropagator(propagation.NewCompositeTextMapPropagator(
		propagation.TraceContext{},
		propagation.Baggage{},
	))

	return traceProvider, nil
}

func StartTrace(
	ctx context.Context,
	tracer trace.Tracer,
	spanName string,
	endpoint string,
	w http.ResponseWriter,
) (context.Context, trace.Span) {
	var span trace.Span

	switch {
	case tracer != nil:
		ctx, span = tracer.Start(ctx, spanName)
		span.SetAttributes(attribute.String("endpoint", endpoint))

	default:
		span = trace.SpanFromContext(ctx)
	}

	otel.GetTextMapPropagator().Inject(ctx, propagation.HeaderCarrier(w.Header()))
	ctx = setTracer(ctx, tracer)

	return ctx, span
}
