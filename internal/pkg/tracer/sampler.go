package tracer

import (
	"go.opentelemetry.io/otel/sdk/trace"
)

type endpointExcluder struct {
	endpoints   map[string]struct{}
	probability float64
}

func newEndpointExcluder(
	endpoints map[string]struct{},
	probability float64,
) endpointExcluder {
	return endpointExcluder{
		endpoints:   endpoints,
		probability: probability,
	}
}

func (ee endpointExcluder) ShouldSample(
	parameters trace.SamplingParameters,
) trace.SamplingResult {
	for i := range parameters.Attributes {
		if parameters.Attributes[i].Key == "http.target" {
			if _, exists := ee.endpoints[parameters.Attributes[i].Value.AsString()]; exists {
				return trace.SamplingResult{Decision: trace.Drop}
			}
		}
	}

	return trace.TraceIDRatioBased(ee.probability).ShouldSample(parameters)
}

func (endpointExcluder) Description() string {
	return "customSampler"
}
