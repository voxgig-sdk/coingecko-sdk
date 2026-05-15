# Coingecko SDK utility: feature_add
module CoingeckoUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
