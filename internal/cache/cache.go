package cache

import (
	"context"
	"fmt"
	"time"

	"github.com/go-redis/redis/v8"
)

type Cache struct {
	client *redis.Client
}

func NewCache(addr string, poolSize int) *Cache {
	client := redis.NewClient(&redis.Options{
		Addr:     addr,
		PoolSize: poolSize,
	})

	return &Cache{client: client}
}

func (c *Cache) Set(
	ctx context.Context,
	key string,
	value interface{},
	ttl time.Duration,
) error {
	err := c.client.Set(ctx, key, value, ttl).Err()
	if err != nil {
		return fmt.Errorf("failed to set key %s: %v", key, err)
	}
	return nil
}

func (c *Cache) Get(ctx context.Context, key string) (string, error) {
	val, err := c.client.Get(ctx, key).Result()
	if err == redis.Nil {
		return "", nil
	} else if err != nil {
		return "", fmt.Errorf("failed to get key %s: %v", key, err)
	}
	return val, nil
}

func (c *Cache) Delete(ctx context.Context, key string) error {
	err := c.client.Del(ctx, key).Err()
	if err != nil {
		return fmt.Errorf("failed to delete key %s: %v", key, err)
	}
	return nil
}
