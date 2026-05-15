<?php
declare(strict_types=1);

// Coingecko SDK utility: feature_add

class CoingeckoFeatureAdd
{
    public static function call(CoingeckoContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
