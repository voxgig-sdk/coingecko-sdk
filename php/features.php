<?php
declare(strict_types=1);

// Coingecko SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class CoingeckoFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new CoingeckoBaseFeature();
            case "test":
                return new CoingeckoTestFeature();
            default:
                return new CoingeckoBaseFeature();
        }
    }
}
