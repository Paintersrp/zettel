package cmd

import (
	"context"
	"fmt"
	"os"

	"github.com/Paintersrp/zettel/internal/app"
	"github.com/Paintersrp/zettel/internal/cache"
	"github.com/Paintersrp/zettel/internal/config"
	"github.com/Paintersrp/zettel/internal/db"
	"github.com/Paintersrp/zettel/internal/tracer"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/rs/zerolog"
)

func Start() error {
	zerolog.TimeFieldFormat = zerolog.TimeFormatUnix
	logger := zerolog.New(os.Stdout).With().Timestamp().Logger()

	cfg, err := config.Load()

	if err != nil {
		logger.Fatal().Err(err).Msg("Failed to load config")
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

	// logger, err := zap.NewProduction()
	// if err != nil {
	// 	log.Fatalf("Failed to initialize zap logger: %v", err)
	// }
	// defer logger.Sync()

	app, err := app.NewApp(cfg, dbClient, c, logger)

	if err != nil {
		logger.Fatal().Err(err).Msg("Failed to instantiate application")
	}

	if err := app.Run(); err != nil {
		logger.Fatal().Err(err).Msg("Server stopped with error")
		return err
	}

	return nil
}
