package app

import (
	"github.com/Paintersrp/zettel/internal/cache"
	"github.com/Paintersrp/zettel/internal/config"
	"github.com/Paintersrp/zettel/internal/db"
	mid "github.com/Paintersrp/zettel/internal/middleware"
	"github.com/Paintersrp/zettel/pkg/api"
	auth "github.com/Paintersrp/zettel/pkg/auth/handler"
	"github.com/gorilla/sessions"
	"github.com/labstack/echo-contrib/session"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"go.opentelemetry.io/contrib/instrumentation/github.com/labstack/echo/otelecho"
	"go.opentelemetry.io/otel/trace"
)

type App struct {
	Server *echo.Echo
	DB     *db.Queries
	Cache  *cache.Cache
	Config *config.Config
	Tracer trace.Tracer
}

func NewApp(
	cfg *config.Config,
	dbClient *db.Queries,
	cache *cache.Cache,
) (*App, error) {
	e := echo.New()

	// TODO: * for dev
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
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

	e.Use(middleware.Recover())
	e.Use(session.Middleware(sessions.NewCookieStore([]byte(cfg.JwtSecret))))
	e.Use(otelecho.Middleware(cfg.OpenTelemetryService))
	e.Use(mid.Authentication(cfg.JwtSecret))

	return &App{
		Server: e,
		DB:     dbClient,
		Cache:  cache,
		Config: cfg,
	}, nil
}

func (app *App) Init() {
	app.SetupServices()
}

func (app *App) SetupServices() {
	api.RegisterRoutes(app.Server, app.DB, app.Cache, app.Config)
	auth.RegisterRoutes(app.Server, app.DB, app.Config)
}

func (app *App) Run() {
	app.Server.Logger.Fatal(app.Server.Start(app.Config.Port))
}
