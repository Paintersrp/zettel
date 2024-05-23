package utils

import (
	"bytes"
	"context"
	"fmt"
	"net/http"
	"time"

	"github.com/Paintersrp/zettel/internal/cache"
	"github.com/a-h/templ"
	"github.com/labstack/echo/v4"
)

func Render(ctx echo.Context, code int, t templ.Component) error {
	buf, err := render(ctx.Request().Context(), t)
	defer templ.ReleaseBuffer(buf)
	if err != nil {
		return err
	}

	return ctx.HTML(code, buf.String())
}

// RenderWithCaching renders the given templ.Component and caches it if necessary.
func RenderWithCaching(
	ctx echo.Context,
	code int,
	t templ.Component,
	cache *cache.Cache,
	ttl time.Duration,
) error {
	key := GenerateCacheKey(ctx.Request())

	val, err := cache.Get(ctx.Request().Context(), key)
	if val != "" {

		fmt.Println("cache hit")
		return ctx.HTML(code, val)
	}
	if err != nil {
		return err
	}

	fmt.Println("cache miss")

	buf, err := render(ctx.Request().Context(), t)
	defer templ.ReleaseBuffer(buf)
	if err != nil {
		return err
	}

	cache.Set(ctx.Request().Context(), key, buf.String(), ttl)
	return ctx.HTML(code, buf.String())
}

func render(ctx context.Context, t templ.Component) (*bytes.Buffer, error) {
	buf := templ.GetBuffer()

	if err := t.Render(ctx, buf); err != nil {
		return nil, err
	}

	return buf, nil

}

func GenerateCacheKey(req *http.Request) string {
	key := fmt.Sprintf("%s:%s", req.Method, req.URL.Path)

	query := req.URL.Query()
	for k, v := range query {
		key += fmt.Sprintf(":%s=%s", k, v[0])
	}

	return key
}

func GetTTLByEnv(isDev bool, prodTtl time.Duration) time.Duration {
	var ttl = 1 * time.Second
	if !isDev {
		ttl = prodTtl
	}
	return ttl
}
