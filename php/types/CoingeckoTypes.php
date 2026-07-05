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
    public ?string $gecko_say = null;
}

/** Request payload for General#load. */
class GeneralLoadMatch
{
    public ?string $gecko_say = null;
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
    public ?array $bitcoin = null;
    public ?array $ethereum = null;
}

