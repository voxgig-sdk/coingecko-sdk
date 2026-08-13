# Coingecko SDK feature factory

from coingecko_sdk.feature.base_feature import CoingeckoBaseFeature
from coingecko_sdk.feature.test_feature import CoingeckoTestFeature


def _make_feature(name):
    features = {
        "base": lambda: CoingeckoBaseFeature(),
        "test": lambda: CoingeckoTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
