package voxgigcoingeckosdk

import (
	"github.com/voxgig-sdk/coingecko-sdk/go/core"
	"github.com/voxgig-sdk/coingecko-sdk/go/entity"
	"github.com/voxgig-sdk/coingecko-sdk/go/feature"
	_ "github.com/voxgig-sdk/coingecko-sdk/go/utility"
)

// Type aliases preserve external API.
type CoingeckoSDK = core.CoingeckoSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type CoingeckoEntity = core.CoingeckoEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type CoingeckoError = core.CoingeckoError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewGeneralEntityFunc = func(client *core.CoingeckoSDK, entopts map[string]any) core.CoingeckoEntity {
		return entity.NewGeneralEntity(client, entopts)
	}
	core.NewSimpleEntityFunc = func(client *core.CoingeckoSDK, entopts map[string]any) core.CoingeckoEntity {
		return entity.NewSimpleEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewCoingeckoSDK = core.NewCoingeckoSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
