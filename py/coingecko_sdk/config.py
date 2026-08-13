# Coingecko SDK configuration


def make_config():
    return {
        "main": {
            "name": "Coingecko",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://api.coingecko.com/api/v3",
            "auth": {
                "prefix": "",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "general": {},
                "simple": {},
            },
        },
        "entity": {
      "general": {
        "fields": [
          {
            "active": True,
            "name": "gecko_says",
            "req": False,
            "type": "`$STRING`",
            "index$": 0,
          },
        ],
        "name": "general",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/ping",
                "parts": [
                  "ping",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "simple": {
        "fields": [
          {
            "active": True,
            "name": "bitcoin",
            "req": False,
            "type": "`$OBJECT`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "ethereum",
            "req": False,
            "type": "`$OBJECT`",
            "index$": 1,
          },
        ],
        "name": "simple",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "example": "bitcoin,ethereum",
                      "kind": "query",
                      "name": "ids",
                      "orig": "ids",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "example": False,
                      "kind": "query",
                      "name": "include_24hr_change",
                      "orig": "include_24hr_change",
                      "reqd": False,
                      "type": "`$BOOLEAN`",
                    },
                    {
                      "active": True,
                      "example": False,
                      "kind": "query",
                      "name": "include_24hr_vol",
                      "orig": "include_24hr_vol",
                      "reqd": False,
                      "type": "`$BOOLEAN`",
                    },
                    {
                      "active": True,
                      "example": False,
                      "kind": "query",
                      "name": "include_last_updated_at",
                      "orig": "include_last_updated_at",
                      "reqd": False,
                      "type": "`$BOOLEAN`",
                    },
                    {
                      "active": True,
                      "example": False,
                      "kind": "query",
                      "name": "include_market_cap",
                      "orig": "include_market_cap",
                      "reqd": False,
                      "type": "`$BOOLEAN`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "precision",
                      "orig": "precision",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "example": "usd,eur",
                      "kind": "query",
                      "name": "vs_currency",
                      "orig": "vs_currency",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/simple/price",
                "parts": [
                  "simple",
                  "price",
                ],
                "select": {
                  "$action": "price",
                  "exist": [
                    "ids",
                    "include_24hr_change",
                    "include_24hr_vol",
                    "include_last_updated_at",
                    "include_market_cap",
                    "precision",
                    "vs_currency",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
