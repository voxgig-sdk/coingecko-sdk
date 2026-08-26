<?php
declare(strict_types=1);

// Coingecko SDK configuration

class CoingeckoConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "Coingecko",
                "slug" => "coingecko",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
          'transport' => 'base',
        ],
            ],
            "options" => [
                "base" => "https://api.coingecko.com/api/v3",
                "auth" => [
                    "prefix" => "",
                ],
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "general" => [],
                    "simple" => [],
                ],
            ],
            "entity" => [
        'general' => [
          'fields' => [
            [
              'name' => 'gecko_says',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'general',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/ping',
                  'parts' => [
                    'ping',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'simple' => [
          'fields' => [
            [
              'name' => 'bitcoin',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'ethereum',
              'type' => '`$OBJECT`',
            ],
          ],
          'name' => 'simple',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 'bitcoin,ethereum',
                        'kind' => 'query',
                        'name' => 'ids',
                        'orig' => 'ids',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => false,
                        'kind' => 'query',
                        'name' => 'include_24hr_change',
                        'orig' => 'include_24hr_change',
                        'type' => '`$BOOLEAN`',
                      ],
                      [
                        'example' => false,
                        'kind' => 'query',
                        'name' => 'include_24hr_vol',
                        'orig' => 'include_24hr_vol',
                        'type' => '`$BOOLEAN`',
                      ],
                      [
                        'example' => false,
                        'kind' => 'query',
                        'name' => 'include_last_updated_at',
                        'orig' => 'include_last_updated_at',
                        'type' => '`$BOOLEAN`',
                      ],
                      [
                        'example' => false,
                        'kind' => 'query',
                        'name' => 'include_market_cap',
                        'orig' => 'include_market_cap',
                        'type' => '`$BOOLEAN`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'precision',
                        'orig' => 'precision',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 'usd,eur',
                        'kind' => 'query',
                        'name' => 'vs_currency',
                        'orig' => 'vs_currency',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/simple/price',
                  'parts' => [
                    'simple',
                    'price',
                  ],
                  'select' => [
                    '$action' => 'price',
                    'exist' => [
                      'ids',
                      'include_24hr_change',
                      'include_24hr_vol',
                      'include_last_updated_at',
                      'include_market_cap',
                      'precision',
                      'vs_currency',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return CoingeckoFeatures::make_feature($name);
    }
}
