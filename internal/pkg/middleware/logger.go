package middleware

import (
	"time"

	"github.com/labstack/echo/v4"
	"github.com/rs/zerolog"
)

func Logger(logger zerolog.Logger) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			start := time.Now()
			err := next(c)
			latency := time.Since(start)

			req := c.Request()
			res := c.Response()

			event := logger.Info().
				Str("remote_ip", c.RealIP()).
				Str("host", req.Host).
				Str("method", req.Method).
				Str("uri", req.RequestURI).
				Str("user_agent", req.UserAgent()).
				Int("status", res.Status).
				Dur("latency", latency).
				Int64("bytes_in", req.ContentLength).
				Int64("bytes_out", res.Size)

			if err != nil {
				event.Err(err)
			}

			event.Msg("Request")
			return err
		}
	}
}
