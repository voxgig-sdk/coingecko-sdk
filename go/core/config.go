package core

func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Coingecko",
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
				"prefix": "Bearer",
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
						"active": true,
						"name": "gecko_say",
						"req": false,
						"type": "`$STRING`",
						"index$": 0,
					},
				},
				"name": "general",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{},
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
								"index$": 0,
							},
						},
						"key$": "load",
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"simple": map[string]any{
				"fields": []any{
					map[string]any{
						"active": true,
						"name": "bitcoin",
						"req": false,
						"type": "`$OBJECT`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "ethereum",
						"req": false,
						"type": "`$OBJECT`",
						"index$": 1,
					},
				},
				"name": "simple",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"active": true,
											"example": "bitcoin,ethereum",
											"kind": "query",
											"name": "ids",
											"orig": "ids",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"example": false,
											"kind": "query",
											"name": "include_24hr_change",
											"orig": "include_24hr_change",
											"reqd": false,
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"active": true,
											"example": false,
											"kind": "query",
											"name": "include_24hr_vol",
											"orig": "include_24hr_vol",
											"reqd": false,
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"active": true,
											"example": false,
											"kind": "query",
											"name": "include_last_updated_at",
											"orig": "include_last_updated_at",
											"reqd": false,
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"active": true,
											"example": false,
											"kind": "query",
											"name": "include_market_cap",
											"orig": "include_market_cap",
											"reqd": false,
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "precision",
											"orig": "precision",
											"reqd": false,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"example": "usd,eur",
											"kind": "query",
											"name": "vs_currency",
											"orig": "vs_currency",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
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
								"index$": 0,
							},
						},
						"key$": "load",
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
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
