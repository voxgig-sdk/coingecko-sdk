# Typed models for the Coingecko SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class General(TypedDict, total=False):
    gecko_says: str


class GeneralLoadMatch(TypedDict, total=False):
    gecko_says: str


class Simple(TypedDict, total=False):
    bitcoin: dict
    ethereum: dict


class SimpleLoadMatchRequired(TypedDict):
    ids: str
    vs_currency: str


class SimpleLoadMatch(SimpleLoadMatchRequired, total=False):
    include_24hr_change: bool
    include_24hr_vol: bool
    include_last_updated_at: bool
    include_market_cap: bool
    precision: str
