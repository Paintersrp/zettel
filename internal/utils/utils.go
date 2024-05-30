package utils

import (
	"fmt"
	"net/http"
	"reflect"
	"runtime"
	"strings"

	"github.com/Paintersrp/zettel/internal/validate"
	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
)

type Handler interface {
	Validator() *validate.Validator
}

func BindAndValidatePayload[T any, H Handler](c echo.Context, h H) (*T, error) {
	var payload T

	if err := c.Bind(&payload); err != nil {
		_, file, line, _ := runtime.Caller(1)
		return nil, echo.NewHTTPError(
			http.StatusBadRequest,
			fmt.Sprintf(
				"Failed to bind payload of type %s: %v (at %s:%d). Payload: %+v",
				reflect.TypeOf(payload).String(),
				err,
				file,
				line,
				payload,
			),
		)
	}

	if err := h.Validator().Validate(payload); err != nil {
		_, file, line, _ := runtime.Caller(1)
		validationErrors, ok := err.(validator.ValidationErrors)
		if !ok {
			return nil, echo.NewHTTPError(
				http.StatusBadRequest,
				fmt.Sprintf(
					"Validation failed for payload of type %s: %v (at %s:%d). Payload: %+v",
					reflect.TypeOf(payload).String(),
					err,
					file,
					line,
					payload,
				),
			)
		}

		errorDetails := make([]string, 0, len(validationErrors))
		for _, validationError := range validationErrors {
			errorDetails = append(errorDetails, validationError.Error())
		}
		return nil, echo.NewHTTPError(
			http.StatusBadRequest,
			fmt.Sprintf(
				"Validation failed for payload of type %s: %s (at %s:%d). Payload: %+v",
				reflect.TypeOf(payload).String(),
				strings.Join(errorDetails, ", "),
				file,
				line,
				payload,
			),
		)
	}

	return &payload, nil
}
