package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewGeneralEntityFunc func(client *CoingeckoSDK, entopts map[string]any) CoingeckoEntity

var NewSimpleEntityFunc func(client *CoingeckoSDK, entopts map[string]any) CoingeckoEntity

