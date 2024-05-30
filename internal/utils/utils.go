package utils

import (
	"net/http"

	"github.com/Paintersrp/zettel/internal/validate"
	"github.com/labstack/echo/v4"
)

type Handler interface {
	Validator() *validate.Validator
}

func BindAndValidatePayload[T any, H Handler](c echo.Context, h H) (*T, error) {
	var payload T
	if err := c.Bind(&payload); err != nil {
		return nil, echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	if err := h.Validator().Validate(payload); err != nil {
		return nil, echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	return &payload, nil
}
