<?php
declare(strict_types=1);

// Coingecko SDK utility: prepare_body

class CoingeckoPrepareBody
{
    public static function call(CoingeckoContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
