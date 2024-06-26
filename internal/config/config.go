package config

import (
	"log"

	"github.com/joho/godotenv"
	"github.com/kelseyhightower/envconfig"
)

type Config struct {
	Environment           string  `envconfig:"ENV"                         default:"dev"`
	Port                  string  `envconfig:"PORT"                        default:"0.0.0.0:6474"`
	DatabaseURL           string  `envconfig:"GOOSE_DBSTRING"`
	DataApiPrefix         string  `envconfig:"DATA_API_PREFIX"`
	AuthApiPrefix         string  `envconfig:"AUTH_API_PREFIX"`
	JwtSecret             string  `envconfig:"JWT_SECRET"`
	OpenTelemetryService  string  `envconfig:"SERVICE_NAME"`
	OpenTelemetryEndpoint string  `envconfig:"OTEL_EXPORTER_OTLP_ENDPOINT"`
	OpenTelemetryProb     float64 `envconfig:"OPEN_PROBABILITY"            default:"0.05"`
}

func Load() (*Config, error) {
	if err := godotenv.Load(); err != nil {
		log.Print("No .env file found")
	}

	var cfg Config
	err := envconfig.Process("", &cfg)

	// TODO: Check(&cfg)
	// log.Printf("Config: %+v", cfg)

	if err != nil {
		return nil, err
	}
	return &cfg, nil
}
