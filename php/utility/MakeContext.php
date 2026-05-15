<?php
declare(strict_types=1);

// Coingecko SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class CoingeckoMakeContext
{
    public static function call(array $ctxmap, ?CoingeckoContext $basectx): CoingeckoContext
    {
        return new CoingeckoContext($ctxmap, $basectx);
    }
}
