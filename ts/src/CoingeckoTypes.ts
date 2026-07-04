// Typed models for the Coingecko SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface General {
  gecko_say?: string
}

export type GeneralLoadMatch = Partial<General>

export interface Simple {
  bitcoin?: Record<string, any>
  ethereum?: Record<string, any>
}

export type SimpleLoadMatch = Partial<Simple>

