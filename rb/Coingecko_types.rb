# frozen_string_literal: true

# Typed models for the Coingecko SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# General entity data model.
#
# @!attribute [rw] gecko_says
#   @return [String, nil]
General = Struct.new(
  :gecko_says,
  keyword_init: true
)

# Request payload for General#load.
#
# @!attribute [rw] gecko_says
#   @return [String, nil]
GeneralLoadMatch = Struct.new(
  :gecko_says,
  keyword_init: true
)

# Simple entity data model.
#
# @!attribute [rw] bitcoin
#   @return [Hash, nil]
#
# @!attribute [rw] ethereum
#   @return [Hash, nil]
Simple = Struct.new(
  :bitcoin,
  :ethereum,
  keyword_init: true
)

# Request payload for Simple#load.
#
# @!attribute [rw] ids
#   @return [String]
#
# @!attribute [rw] include_24hr_change
#   @return [Boolean, nil]
#
# @!attribute [rw] include_24hr_vol
#   @return [Boolean, nil]
#
# @!attribute [rw] include_last_updated_at
#   @return [Boolean, nil]
#
# @!attribute [rw] include_market_cap
#   @return [Boolean, nil]
#
# @!attribute [rw] precision
#   @return [String, nil]
#
# @!attribute [rw] vs_currency
#   @return [String]
SimpleLoadMatch = Struct.new(
  :ids,
  :include_24hr_change,
  :include_24hr_vol,
  :include_last_updated_at,
  :include_market_cap,
  :precision,
  :vs_currency,
  keyword_init: true
)

