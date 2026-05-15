# Coingecko SDK utility: make_context
require_relative '../core/context'
module CoingeckoUtilities
  MakeContext = ->(ctxmap, basectx) {
    CoingeckoContext.new(ctxmap, basectx)
  }
end
