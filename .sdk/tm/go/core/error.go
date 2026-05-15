package core

type CoingeckoError struct {
	IsCoingeckoError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewCoingeckoError(code string, msg string, ctx *Context) *CoingeckoError {
	return &CoingeckoError{
		IsCoingeckoError: true,
		Sdk:              "Coingecko",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *CoingeckoError) Error() string {
	return e.Msg
}
