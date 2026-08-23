# Coingecko SDK configuration


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "Coingecko",
            "slug": "coingecko",
            "version": "0.0.1",
            "target": "py",
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
            "name": "gecko_says",
            "type": "`$STRING`",
          },
        ],
        "name": "general",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
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
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "simple": {
        "fields": [
          {
            "name": "bitcoin",
            "type": "`$OBJECT`",
          },
          {
            "name": "ethereum",
            "type": "`$OBJECT`",
          },
        ],
        "name": "simple",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": "bitcoin,ethereum",
                      "kind": "query",
                      "name": "ids",
                      "orig": "ids",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "example": False,
                      "kind": "query",
                      "name": "include_24hr_change",
                      "orig": "include_24hr_change",
                      "type": "`$BOOLEAN`",
                    },
                    {
                      "example": False,
                      "kind": "query",
                      "name": "include_24hr_vol",
                      "orig": "include_24hr_vol",
                      "type": "`$BOOLEAN`",
                    },
                    {
                      "example": False,
                      "kind": "query",
                      "name": "include_last_updated_at",
                      "orig": "include_last_updated_at",
                      "type": "`$BOOLEAN`",
                    },
                    {
                      "example": False,
                      "kind": "query",
                      "name": "include_market_cap",
                      "orig": "include_market_cap",
                      "type": "`$BOOLEAN`",
                    },
                    {
                      "kind": "query",
                      "name": "precision",
                      "orig": "precision",
                      "type": "`$STRING`",
                    },
                    {
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
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
