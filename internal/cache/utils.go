package cache

import (
	"fmt"
	"net/http"
	"time"
)

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
