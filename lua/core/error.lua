-- Coingecko SDK error

local CoingeckoError = {}
CoingeckoError.__index = CoingeckoError


function CoingeckoError.new(code, msg, ctx)
  local self = setmetatable({}, CoingeckoError)
  self.is_sdk_error = true
  self.sdk = "Coingecko"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function CoingeckoError:error()
  return self.msg
end


function CoingeckoError:__tostring()
  return self.msg
end


return CoingeckoError
