-- Coingecko SDK exists test

local sdk = require("coingecko_sdk")

describe("CoingeckoSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
