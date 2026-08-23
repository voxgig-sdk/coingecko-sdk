
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'Coingecko',
        slug: "coingecko",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: "https://api.coingecko.com/api/v3",

    auth: {
      prefix: '',
    },

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      general: {
      },

      simple: {
      },

    }
  }


  entity = {
    "general": {
      "fields": [
        {
          "name": "gecko_says",
          "type": "`$STRING`"
        }
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
                "ping"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "simple": {
      "fields": [
        {
          "name": "bitcoin",
          "type": "`$OBJECT`"
        },
        {
          "name": "ethereum",
          "type": "`$OBJECT`"
        }
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
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "example": false,
                    "kind": "query",
                    "name": "include_24hr_change",
                    "orig": "include_24hr_change",
                    "type": "`$BOOLEAN`"
                  },
                  {
                    "example": false,
                    "kind": "query",
                    "name": "include_24hr_vol",
                    "orig": "include_24hr_vol",
                    "type": "`$BOOLEAN`"
                  },
                  {
                    "example": false,
                    "kind": "query",
                    "name": "include_last_updated_at",
                    "orig": "include_last_updated_at",
                    "type": "`$BOOLEAN`"
                  },
                  {
                    "example": false,
                    "kind": "query",
                    "name": "include_market_cap",
                    "orig": "include_market_cap",
                    "type": "`$BOOLEAN`"
                  },
                  {
                    "kind": "query",
                    "name": "precision",
                    "orig": "precision",
                    "type": "`$STRING`"
                  },
                  {
                    "example": "usd,eur",
                    "kind": "query",
                    "name": "vs_currency",
                    "orig": "vs_currency",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/simple/price",
              "parts": [
                "simple",
                "price"
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
                  "vs_currency"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

