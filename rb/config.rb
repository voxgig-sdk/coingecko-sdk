# Coingecko SDK configuration

module CoingeckoConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "Coingecko",
        "slug" => "coingecko",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "ratelimit" => {
          "options" => {
            "active" => false,
            "burst" => 5,
            "rate" => 5,
          },
          "optspec" => {
            "now" => "`$FUNCTION`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "retry" => {
          "options" => {
            "active" => false,
            "factor" => 2,
            "maxDelay" => 2000,
            "minDelay" => 50,
            "retries" => 2,
            "statuses" => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          },
          "optspec" => {
            "jitter" => "`$BOOLEAN`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "test" => {
          "options" => {
            "active" => false,
          },
          "optspec" => {
            "entity" => "`$MAP`",
            "net" => "`$MAP`",
          },
          "strict" => false,
          "transport" => "base",
        },
        "timeout" => {
          "options" => {
            "active" => false,
            "ms" => 30000,
          },
          "optspec" => {
            "clearTimer" => "`$FUNCTION`",
            "setTimer" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
      },
      "options" => {
        "base" => "https://api.coingecko.com/api/v3",
        "auth" => {
          "prefix" => "",
          "name" => "x-cg-demo-api-key",
        },
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "general" => {},
          "simple" => {},
        },
      },
      "entity" => {
        "general" => {
          "fields" => [
            {
              "name" => "gecko_says",
              "type" => "`$STRING`",
            },
          ],
          "name" => "general",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/ping",
                  "segments" => [
                    {
                      "lit" => "ping",
                    },
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "ping",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "simple" => {
          "fields" => [],
          "name" => "simple",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "bitcoin,ethereum",
                        "kind" => "query",
                        "name" => "ids",
                        "orig" => "ids",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => false,
                        "kind" => "query",
                        "name" => "include_24hr_change",
                        "orig" => "include_24hr_change",
                        "type" => "`$BOOLEAN`",
                      },
                      {
                        "example" => false,
                        "kind" => "query",
                        "name" => "include_24hr_vol",
                        "orig" => "include_24hr_vol",
                        "type" => "`$BOOLEAN`",
                      },
                      {
                        "example" => false,
                        "kind" => "query",
                        "name" => "include_last_updated_at",
                        "orig" => "include_last_updated_at",
                        "type" => "`$BOOLEAN`",
                      },
                      {
                        "example" => false,
                        "kind" => "query",
                        "name" => "include_market_cap",
                        "orig" => "include_market_cap",
                        "type" => "`$BOOLEAN`",
                      },
                      {
                        "kind" => "query",
                        "name" => "precision",
                        "orig" => "precision",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "usd,eur",
                        "kind" => "query",
                        "name" => "vs_currency",
                        "orig" => "vs_currency",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/simple/price",
                  "segments" => [
                    {
                      "lit" => "simple",
                    },
                    {
                      "lit" => "price",
                    },
                  ],
                  "select" => {
                    "$action" => "price",
                    "exist" => [
                      "ids",
                      "include_24hr_change",
                      "include_24hr_vol",
                      "include_last_updated_at",
                      "include_market_cap",
                      "precision",
                      "vs_currency",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "simple",
                    "price",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    CoingeckoFeatures.make_feature(name)
  end
end
