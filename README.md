# Coingecko SDK

Aggregated cryptocurrency prices, market data, NFTs, exchanges, and historical series across thousands of coins

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About CoinGecko API

[CoinGecko](https://www.coingecko.com/) is one of the longest-running independent cryptocurrency data aggregators, founded in 2014. Its public API exposes the same price, market, and metadata feeds that power the CoinGecko website and many third-party wallets, dashboards, and research tools.

What you get from the API:

- Real-time and historical prices for thousands of cryptocurrencies
- Market data: trading volume, market cap, trading pairs, and tickers
- Coin metadata, categories, and developer/community stats
- NFT collection floor prices and base data
- Exchange listings and derivatives information
- Coverage spanning 1,000+ exchanges, 18,000+ coins, and on-chain DEX data across many networks

Operational notes: the base URL is `https://api.coingecko.com/api/v3`. A free Demo API key is available with conservative rate limits, while Pro plans raise limits and add WebSocket and Webhook delivery. Responses are JSON and CORS is generally permitted for browser use. Always check the current docs for endpoint availability — some historical endpoints have been deprecated or moved between plan tiers.

## Try it

**TypeScript**
```bash
npm install coingecko
```

**Python**
```bash
pip install coingecko-sdk
```

**PHP**
```bash
composer require voxgig/coingecko-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/coingecko-sdk/go
```

**Ruby**
```bash
gem install coingecko-sdk
```

**Lua**
```bash
luarocks install coingecko-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { CoingeckoSDK } from 'coingecko'

const client = new CoingeckoSDK({})

```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o coingecko-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "coingecko": {
      "command": "/abs/path/to/coingecko-mcp"
    }
  }
}
```

## Entities

The API exposes 2 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **General** | Catch-all grouping for endpoints that don't fit a more specific resource, such as global market stats, ping checks, and shared utility calls under `https://api.coingecko.com/api/v3`. | `/ping` |
| **Simple** | Lightweight price lookup endpoints (e.g. `/simple/price`, `/simple/token_price`) that return current prices for one or more coins in one or more target currencies without the overhead of full coin objects. | `/simple/price` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from coingecko_sdk import CoingeckoSDK

client = CoingeckoSDK({})


# Load a specific general
general, err = client.General(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'coingecko_sdk.php';

$client = new CoingeckoSDK([]);


// Load a specific general
[$general, $err] = $client->General(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/coingecko-sdk/go"

client := sdk.NewCoingeckoSDK(map[string]any{})

```

### Ruby

```ruby
require_relative "Coingecko_sdk"

client = CoingeckoSDK.new({})


# Load a specific general
general, err = client.General(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("coingecko_sdk")

local client = sdk.new({})


-- Load a specific general
local general, err = client:General(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = CoingeckoSDK.test()
const result = await client.General().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = CoingeckoSDK.test(None, None)
result, err = client.General(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = CoingeckoSDK::test(null, null);
[$result, $err] = $client->General(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.General(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = CoingeckoSDK.test(nil, nil)
result, err = client.General(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:General(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the CoinGecko API

- Upstream: [https://www.coingecko.com/](https://www.coingecko.com/)
- API docs: [https://docs.coingecko.com/](https://docs.coingecko.com/)

- Proprietary commercial service operated by CoinGecko
- Free Demo API key available with rate limits; paid Pro plans (Analyst tier and above) unlock higher limits and additional delivery methods
- See CoinGecko terms of service and API plan documentation for attribution and redistribution rules
- Underlying market data is sourced from 1,000+ exchanges; downstream usage may be subject to each source's terms

---

Generated from the CoinGecko API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
