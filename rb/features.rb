# Coingecko SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module CoingeckoFeatures
  def self.make_feature(name)
    case name
    when "base"
      CoingeckoBaseFeature.new
    when "ratelimit"
      CoingeckoRatelimitFeature.new
    when "retry"
      CoingeckoRetryFeature.new
    when "test"
      CoingeckoTestFeature.new
    when "timeout"
      CoingeckoTimeoutFeature.new
    else
      CoingeckoBaseFeature.new
    end
  end
end
