package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Coingecko",
			"slug": "coingecko",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
			},
		},
		"options": map[string]any{
			"base": "https://api.coingecko.com/api/v3",
			"auth": map[string]any{
				"prefix": "",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"general": map[string]any{},
				"simple": map[string]any{},
			},
		},
		"entity": map[string]any{
			"general": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "gecko_says",
						"type": "`$STRING`",
					},
				},
				"name": "general",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/ping",
								"parts": []any{
									"ping",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"simple": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "bitcoin",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "ethereum",
						"type": "`$OBJECT`",
					},
				},
				"name": "simple",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "bitcoin,ethereum",
											"kind": "query",
											"name": "ids",
											"orig": "ids",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"example": false,
											"kind": "query",
											"name": "include_24hr_change",
											"orig": "include_24hr_change",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"example": false,
											"kind": "query",
											"name": "include_24hr_vol",
											"orig": "include_24hr_vol",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"example": false,
											"kind": "query",
											"name": "include_last_updated_at",
											"orig": "include_last_updated_at",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"example": false,
											"kind": "query",
											"name": "include_market_cap",
											"orig": "include_market_cap",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "precision",
											"orig": "precision",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "usd,eur",
											"kind": "query",
											"name": "vs_currency",
											"orig": "vs_currency",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/simple/price",
								"parts": []any{
									"simple",
									"price",
								},
								"select": map[string]any{
									"$action": "price",
									"exist": []any{
										"ids",
										"include_24hr_change",
										"include_24hr_vol",
										"include_last_updated_at",
										"include_market_cap",
										"precision",
										"vs_currency",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
