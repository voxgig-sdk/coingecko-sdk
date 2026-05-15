package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewGeneralEntityFunc func(client *CoingeckoSDK, entopts map[string]any) CoingeckoEntity

var NewSimpleEntityFunc func(client *CoingeckoSDK, entopts map[string]any) CoingeckoEntity

