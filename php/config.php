<?php
declare(strict_types=1);

// Coingecko SDK configuration

class CoingeckoConfig
{
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "Coingecko",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
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
              'active' => true,
              'name' => 'gecko_says',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 0,
            ],
          ],
          'name' => 'general',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'active' => true,
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
                  'index$' => 0,
                ],
              ],
              'key$' => 'load',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'simple' => [
          'fields' => [
            [
              'active' => true,
              'name' => 'bitcoin',
              'req' => false,
              'type' => '`$OBJECT`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'ethereum',
              'req' => false,
              'type' => '`$OBJECT`',
              'index$' => 1,
            ],
          ],
          'name' => 'simple',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'query' => [
                      [
                        'active' => true,
                        'example' => 'bitcoin,ethereum',
                        'kind' => 'query',
                        'name' => 'ids',
                        'orig' => 'ids',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'example' => false,
                        'kind' => 'query',
                        'name' => 'include_24hr_change',
                        'orig' => 'include_24hr_change',
                        'reqd' => false,
                        'type' => '`$BOOLEAN`',
                      ],
                      [
                        'active' => true,
                        'example' => false,
                        'kind' => 'query',
                        'name' => 'include_24hr_vol',
                        'orig' => 'include_24hr_vol',
                        'reqd' => false,
                        'type' => '`$BOOLEAN`',
                      ],
                      [
                        'active' => true,
                        'example' => false,
                        'kind' => 'query',
                        'name' => 'include_last_updated_at',
                        'orig' => 'include_last_updated_at',
                        'reqd' => false,
                        'type' => '`$BOOLEAN`',
                      ],
                      [
                        'active' => true,
                        'example' => false,
                        'kind' => 'query',
                        'name' => 'include_market_cap',
                        'orig' => 'include_market_cap',
                        'reqd' => false,
                        'type' => '`$BOOLEAN`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'precision',
                        'orig' => 'precision',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
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
                  'index$' => 0,
                ],
              ],
              'key$' => 'load',
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
