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
# @!attribute [rw] gecko_say
#   @return [String, nil]
General = Struct.new(
  :gecko_say,
  keyword_init: true
)

# Match filter for General#load (any subset of General fields).
#
# @!attribute [rw] gecko_say
#   @return [String, nil]
GeneralLoadMatch = Struct.new(
  :gecko_say,
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

# Match filter for Simple#load (any subset of Simple fields).
#
# @!attribute [rw] bitcoin
#   @return [Hash, nil]
#
# @!attribute [rw] ethereum
#   @return [Hash, nil]
SimpleLoadMatch = Struct.new(
  :bitcoin,
  :ethereum,
  keyword_init: true
)

