

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { CoingeckoSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('SimpleEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COINGECKO_TEST_LIVE=TRUE.
  afterEach(liveDelay('COINGECKO_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CoingeckoSDK.test()
    const ent = testsdk.Simple()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COINGECKO_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'simple.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"bitcoin","req":false,"type":"`$OBJECT`","index$":0},{"active":true,"name":"ethereum","req":false,"type":"`$OBJECT`","index$":1}],"name":"simple","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"query":[{"active":true,"example":"bitcoin,ethereum","kind":"query","name":"ids","orig":"ids","reqd":true,"type":"`$STRING`","index$":0},{"active":true,"example":false,"kind":"query","name":"include_24hr_change","orig":"include_24hr_change","reqd":false,"type":"`$BOOLEAN`","index$":1},{"active":true,"example":false,"kind":"query","name":"include_24hr_vol","orig":"include_24hr_vol","reqd":false,"type":"`$BOOLEAN`","index$":2},{"active":true,"example":false,"kind":"query","name":"include_last_updated_at","orig":"include_last_updated_at","reqd":false,"type":"`$BOOLEAN`","index$":3},{"active":true,"example":false,"kind":"query","name":"include_market_cap","orig":"include_market_cap","reqd":false,"type":"`$BOOLEAN`","index$":4},{"active":true,"kind":"query","name":"precision","orig":"precision","reqd":false,"type":"`$STRING`","index$":5},{"active":true,"example":"usd,eur","kind":"query","name":"vs_currency","orig":"vs_currency","reqd":true,"type":"`$STRING`","index$":6}]},"contract":{"id":"GET /simple/price","json":"{\"operationId\":\"getSimplePrice\",\"parameters\":[{\"description\":\"ID of coins, comma-separated if querying more than 1 coin (e.g. bitcoin,ethereum)\",\"example\":\"bitcoin,ethereum\",\"in\":\"query\",\"name\":\"ids\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Target currency of market data, comma-separated if querying more than 1 currency (e.g. usd,eur)\",\"example\":\"usd,eur\",\"in\":\"query\",\"name\":\"vs_currencies\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Include market cap in response\",\"in\":\"query\",\"name\":\"include_market_cap\",\"required\":false,\"schema\":{\"default\":false,\"type\":\"boolean\"}},{\"description\":\"Include 24hr volume in response\",\"in\":\"query\",\"name\":\"include_24hr_vol\",\"required\":false,\"schema\":{\"default\":false,\"type\":\"boolean\"}},{\"description\":\"Include 24hr price change in response\",\"in\":\"query\",\"name\":\"include_24hr_change\",\"required\":false,\"schema\":{\"default\":false,\"type\":\"boolean\"}},{\"description\":\"Include last updated timestamp in response\",\"in\":\"query\",\"name\":\"include_last_updated_at\",\"required\":false,\"schema\":{\"default\":false,\"type\":\"boolean\"}},{\"description\":\"Decimal precision for price values\",\"in\":\"query\",\"name\":\"precision\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"bitcoin\":{\"eur\":42000,\"last_updated_at\":1640000000,\"usd\":45000,\"usd_24h_change\":2.5,\"usd_24h_vol\":35000000000,\"usd_market_cap\":850000000000},\"ethereum\":{\"eur\":3200,\"last_updated_at\":1640000000,\"usd\":3500,\"usd_24h_change\":1.8,\"usd_24h_vol\":18000000000,\"usd_market_cap\":420000000000}},\"schema\":{\"additionalProperties\":{\"additionalProperties\":{\"type\":\"number\"},\"type\":\"object\"},\"type\":\"object\"}}},\"description\":\"Successful response with cryptocurrency prices\"},\"400\":{\"description\":\"Bad request - invalid parameters\"},\"429\":{\"description\":\"Rate limit exceeded\"}},\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"Optional API key for higher rate limits (Pro accounts)\",\"in\":\"header\",\"name\":\"x-cg-demo-api-key\",\"type\":\"apiKey\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/simple/price","segments":[{"lit":"simple"},{"lit":"price"}],"select":{"$action":"price","exist":["ids","include_24hr_change","include_24hr_vol","include_last_updated_at","include_market_cap","precision","vs_currency"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"simple","name__orig":"simple","Name":"Simple","name_":"simple","name-":"simple","NAME":"SIMPLE","index$":1}, {"active":true,"entity":"simple","key$":"BasicSimpleFlow","kind":"basic","name":"BasicSimpleFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"simple_ref01","srcdatavar":"simple_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-simple_ref01"}}],"index$":0}]}, 'Simple')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let simple_ref01_data = Object.values(setup.data.existing.simple)[0] as any

    // LOAD
    const simple_ref01_ent = client.Simple()
    const simple_ref01_match_dt0: any = {}
    const simple_ref01_data_dt0 = (await simple_ref01_ent.load(simple_ref01_match_dt0)).data()
    assert(null != simple_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/simple/SimpleTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = CoingeckoSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['simple01','simple02','simple03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COINGECKO_TEST_SIMPLE_ENTID': idmap,
    'COINGECKO_TEST_LIVE': 'FALSE',
    'COINGECKO_TEST_EXPLAIN': 'FALSE',
    'COINGECKO_APIKEY': '',
  })

  idmap = env['COINGECKO_TEST_SIMPLE_ENTID']

  const live = 'TRUE' === env.COINGECKO_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COINGECKO_TEST_SIMPLE_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new CoingeckoSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
        apikey: env.COINGECKO_APIKEY,
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.COINGECKO_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
