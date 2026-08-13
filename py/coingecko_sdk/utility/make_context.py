# Coingecko SDK utility: make_context

from coingecko_sdk.core.context import CoingeckoContext


def make_context_util(ctxmap, basectx):
    return CoingeckoContext(ctxmap, basectx)
