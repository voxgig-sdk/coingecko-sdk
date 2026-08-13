// Typed models for the Coingecko SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface General {
  gecko_says?: string
}

export interface GeneralLoadMatch {
  gecko_says?: string
}

export interface Simple {
  bitcoin?: Record<string, any>
  ethereum?: Record<string, any>
}

export interface SimpleLoadMatch {
  bitcoin?: Record<string, any>
  ethereum?: Record<string, any>

  // Selects a custom action instead of the plain load:
  //   'price'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

