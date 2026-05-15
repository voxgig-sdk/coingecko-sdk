# Coingecko SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module CoingeckoFeatures
  def self.make_feature(name)
    case name
    when "base"
      CoingeckoBaseFeature.new
    when "test"
      CoingeckoTestFeature.new
    else
      CoingeckoBaseFeature.new
    end
  end
end
