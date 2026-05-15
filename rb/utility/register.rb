# Coingecko SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

CoingeckoUtility.registrar = ->(u) {
  u.clean = CoingeckoUtilities::Clean
  u.done = CoingeckoUtilities::Done
  u.make_error = CoingeckoUtilities::MakeError
  u.feature_add = CoingeckoUtilities::FeatureAdd
  u.feature_hook = CoingeckoUtilities::FeatureHook
  u.feature_init = CoingeckoUtilities::FeatureInit
  u.fetcher = CoingeckoUtilities::Fetcher
  u.make_fetch_def = CoingeckoUtilities::MakeFetchDef
  u.make_context = CoingeckoUtilities::MakeContext
  u.make_options = CoingeckoUtilities::MakeOptions
  u.make_request = CoingeckoUtilities::MakeRequest
  u.make_response = CoingeckoUtilities::MakeResponse
  u.make_result = CoingeckoUtilities::MakeResult
  u.make_point = CoingeckoUtilities::MakePoint
  u.make_spec = CoingeckoUtilities::MakeSpec
  u.make_url = CoingeckoUtilities::MakeUrl
  u.param = CoingeckoUtilities::Param
  u.prepare_auth = CoingeckoUtilities::PrepareAuth
  u.prepare_body = CoingeckoUtilities::PrepareBody
  u.prepare_headers = CoingeckoUtilities::PrepareHeaders
  u.prepare_method = CoingeckoUtilities::PrepareMethod
  u.prepare_params = CoingeckoUtilities::PrepareParams
  u.prepare_path = CoingeckoUtilities::PreparePath
  u.prepare_query = CoingeckoUtilities::PrepareQuery
  u.result_basic = CoingeckoUtilities::ResultBasic
  u.result_body = CoingeckoUtilities::ResultBody
  u.result_headers = CoingeckoUtilities::ResultHeaders
  u.transform_request = CoingeckoUtilities::TransformRequest
  u.transform_response = CoingeckoUtilities::TransformResponse
}
