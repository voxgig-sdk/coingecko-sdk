package = "voxgig-sdk-coingecko"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/coingecko-sdk.git"
}
description = {
  summary = "Coingecko SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["coingecko_sdk"] = "coingecko_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
