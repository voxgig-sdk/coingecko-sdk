<?php
declare(strict_types=1);

// Coingecko SDK utility: result_body

class CoingeckoResultBody
{
    public static function call(CoingeckoContext $ctx): ?CoingeckoResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
