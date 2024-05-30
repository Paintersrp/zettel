package cmd

import (
	"context"
	"fmt"
	"log"

	"github.com/Paintersrp/zettel/internal/app"
	"github.com/Paintersrp/zettel/internal/cache"
	"github.com/Paintersrp/zettel/internal/config"
	"github.com/Paintersrp/zettel/internal/db"
	"github.com/Paintersrp/zettel/internal/tracer"
	"github.com/jackc/pgx/v5/pgxpool"
	"go.uber.org/zap"
)

func Start() error {
	cfg, err := config.Load()

	if err != nil {
		log.Fatalf("Failed to load config: %v", err)
	}

	p, err := tracer.InitTracing(tracer.Config{
		ServiceName: cfg.OpenTelemetryService,
		Host:        cfg.OpenTelemetryEndpoint,
		ExcludedRoutes: map[string]struct{}{
			"/v1/liveness":  {},
			"/v1/readiness": {},
		},
		Probability: cfg.OpenTelemetryProb,
	})
	if err != nil {
		return fmt.Errorf("starting tracing: %w", err)
	}
	defer p.Shutdown(context.Background())

	ctx := context.Background()
	conn, err := pgxpool.New(ctx, cfg.DatabaseURL)

	if err != nil {
		return err
	}

	dbClient := db.New(conn)
	c := cache.NewCache("localhost:6379", 3)

	logger, err := zap.NewProduction()
	if err != nil {
		log.Fatalf("Failed to initialize zap logger: %v", err)
	}
	defer logger.Sync()

	app, err := app.NewApp(cfg, dbClient, c, logger)

	if err != nil {
		log.Fatal(err)
	}

	if err := app.Run(); err != nil {
		logger.Fatal("Server stopped with error", zap.Error(err))
		return err
	}

	return nil
}
