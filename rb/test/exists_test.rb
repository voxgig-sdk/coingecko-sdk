# Coingecko SDK exists test

require "minitest/autorun"
require_relative "../Coingecko_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = CoingeckoSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
