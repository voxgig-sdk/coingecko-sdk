-- Typed models for the Coingecko SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class General
---@field gecko_says? string

---@class GeneralLoadMatch
---@field gecko_says? string

---@class Simple
---@field bitcoin? table
---@field ethereum? table

---@class SimpleLoadMatch
---@field ids string
---@field include_24hr_change? boolean
---@field include_24hr_vol? boolean
---@field include_last_updated_at? boolean
---@field include_market_cap? boolean
---@field precision? string
---@field vs_currency string

local M = {}

return M
