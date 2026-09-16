# Coingecko SDK feature factory

from coingecko_sdk.feature.base_feature import CoingeckoBaseFeature
from coingecko_sdk.feature.ratelimit_feature import CoingeckoRatelimitFeature
from coingecko_sdk.feature.retry_feature import CoingeckoRetryFeature
from coingecko_sdk.feature.test_feature import CoingeckoTestFeature
from coingecko_sdk.feature.timeout_feature import CoingeckoTimeoutFeature


_FEATURES = {
    "base": lambda: CoingeckoBaseFeature(),
    "ratelimit": lambda: CoingeckoRatelimitFeature(),
    "retry": lambda: CoingeckoRetryFeature(),
    "test": lambda: CoingeckoTestFeature(),
    "timeout": lambda: CoingeckoTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
