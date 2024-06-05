package errors

import "errors"

var (
	ErrUserNoRows  = errors.New("failed to get user: no rows in result set")
	ErrTooManyRows = errors.New("too many rows in result set")
)
