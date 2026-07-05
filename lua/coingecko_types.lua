-- Typed models for the Coingecko SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class General
---@field gecko_say? string

---@class GeneralLoadMatch
---@field gecko_say? string

---@class Simple
---@field bitcoin? table
---@field ethereum? table

---@class SimpleLoadMatch
---@field bitcoin? table
---@field ethereum? table

local M = {}

return M
