package app

import (
	"context"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/Paintersrp/zettel/internal/api"
	"github.com/Paintersrp/zettel/internal/auth"
	"github.com/Paintersrp/zettel/internal/cache"
	"github.com/Paintersrp/zettel/internal/config"
	"github.com/Paintersrp/zettel/internal/db"
	mid "github.com/Paintersrp/zettel/internal/middleware"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"go.opentelemetry.io/contrib/instrumentation/github.com/labstack/echo/otelecho"
	"go.uber.org/zap"
)

type App struct {
	Server *echo.Echo
	DB     *db.Queries
	Cache  *cache.Cache
	Config *config.Config
	Logger *zap.Logger
}

func NewApp(
	cfg *config.Config,
	dbClient *db.Queries,
	cache *cache.Cache,
	logger *zap.Logger,
) (*App, error) {
	e := echo.New()

	app := &App{
		Server: e,
		DB:     dbClient,
		Cache:  cache,
		Config: cfg,
		Logger: logger,
	}

	app.setupMiddleware()
	app.setupRoutes()

	return app, nil
}

func (app *App) setupMiddleware() {
	// TODO: * for dev
	app.Server.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{
			echo.GET,
			echo.HEAD,
			echo.PUT,
			echo.PATCH,
			echo.POST,
			echo.DELETE,
		},
	}))
	app.Server.Use(middleware.Recover())
	app.Server.Use(otelecho.Middleware(app.Config.OpenTelemetryService))
	app.Server.Use(mid.Authentication(app.Config.JwtSecret))
}

func (app *App) setupRoutes() {
	api.RegisterRoutes(app.Server, app.DB, app.Cache, app.Config, app.Logger)
	auth.RegisterAuthRoutes(app.Server, app.DB, app.Cache, app.Config, app.Logger)
}

func (app *App) Run() error {
	go func() {
		if err := app.Server.Start(app.Config.Port); err != nil &&
			err != http.ErrServerClosed {
			app.Logger.Fatal("Failed to start server", zap.Error(err))
		}
	}()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, os.Interrupt, syscall.SIGTERM)
	<-quit

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	if err := app.Server.Shutdown(ctx); err != nil {
		app.Logger.Error("Failed to gracefully shutdown server", zap.Error(err))
		return err
	}

	app.Logger.Info("Server stopped gracefully")
	return nil
}
