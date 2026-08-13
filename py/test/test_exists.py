# Coingecko SDK exists test

import pytest
from coingecko_sdk import CoingeckoSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = CoingeckoSDK.test(None, None)
        assert testsdk is not None
