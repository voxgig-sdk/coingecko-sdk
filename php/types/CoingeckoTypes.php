<?php
declare(strict_types=1);

// Typed models for the Coingecko SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** General entity data model. */
class General
{
    public ?string $gecko_says = null;
}

/** Request payload for General#load. */
class GeneralLoadMatch
{
    public ?string $gecko_says = null;
}

/** Simple entity data model. */
class Simple
{
    public ?array $bitcoin = null;
    public ?array $ethereum = null;
}

/** Request payload for Simple#load. */
class SimpleLoadMatch
{
    public string $ids;
    public ?bool $include_24hr_change = null;
    public ?bool $include_24hr_vol = null;
    public ?bool $include_last_updated_at = null;
    public ?bool $include_market_cap = null;
    public ?string $precision = null;
    public string $vs_currency;
}

