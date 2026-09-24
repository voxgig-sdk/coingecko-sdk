

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"simple","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /simple/price","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"bitcoin,ethereum","k":"query","n":"ids","or":"ids","r":true,"t":"`$STRING`","index$":0},{"a":true,"ex":false,"k":"query","n":"include_24hr_change","or":"include_24hr_change","r":false,"t":"`$BOOLEAN`","index$":1},{"a":true,"ex":false,"k":"query","n":"include_24hr_vol","or":"include_24hr_vol","r":false,"t":"`$BOOLEAN`","index$":2},{"a":true,"ex":false,"k":"query","n":"include_last_updated_at","or":"include_last_updated_at","r":false,"t":"`$BOOLEAN`","index$":3},{"a":true,"ex":false,"k":"query","n":"include_market_cap","or":"include_market_cap","r":false,"t":"`$BOOLEAN`","index$":4},{"a":true,"k":"query","n":"precision","or":"precision","r":false,"t":"`$STRING`","index$":5},{"a":true,"ex":"usd,eur","k":"query","n":"vs_currency","or":"vs_currency","r":true,"t":"`$STRING`","index$":6}]},"k":"http","m":"GET","o":"/simple/price","q":{"$action":"price","exist":["ids","include_24hr_change","include_24hr_vol","include_last_updated_at","include_market_cap","precision","vs_currency"]},"r":{},"s":[{"lit":"simple"},{"lit":"price"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"simple","name__orig":"simple","Name":"Simple","name_":"simple","name-":"simple","NAME":"SIMPLE","index$":1}, {"active":true,"entity":"simple","key$":"BasicSimpleFlow","kind":"basic","name":"BasicSimpleFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"simple_ref01","srcdatavar":"simple_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-simple_ref01"}}],"index$":0}]}, 'Simple', {"GET /simple/price":{"protocol":"http","operationId":"getSimplePrice","responses":{"200":{"description":"Successful response with cryptocurrency prices","content":{"application/json":{"schema":{"type":"object","additionalProperties":{"type":"object","additionalProperties":{"type":"number"}}},"example":{"bitcoin":{"usd":45000,"eur":42000,"usd_market_cap":850000000000,"usd_24h_vol":35000000000,"usd_24h_change":2.5,"last_updated_at":1640000000},"ethereum":{"usd":3500,"eur":3200,"usd_market_cap":420000000000,"usd_24h_vol":18000000000,"usd_24h_change":1.8,"last_updated_at":1640000000}}}}},"400":{"description":"Bad request - invalid parameters"},"429":{"description":"Rate limit exceeded"}},"parameters":[{"name":"ids","in":"query","required":true,"description":"ID of coins, comma-separated if querying more than 1 coin (e.g. bitcoin,ethereum)","schema":{"type":"string"},"example":"bitcoin,ethereum","index$":0},{"name":"vs_currencies","in":"query","required":true,"description":"Target currency of market data, comma-separated if querying more than 1 currency (e.g. usd,eur)","schema":{"type":"string"},"example":"usd,eur","index$":1},{"name":"include_market_cap","in":"query","required":false,"description":"Include market cap in response","schema":{"type":"boolean","default":false},"index$":2},{"name":"include_24hr_vol","in":"query","required":false,"description":"Include 24hr volume in response","schema":{"type":"boolean","default":false},"index$":3},{"name":"include_24hr_change","in":"query","required":false,"description":"Include 24hr price change in response","schema":{"type":"boolean","default":false},"index$":4},{"name":"include_last_updated_at","in":"query","required":false,"description":"Include last updated timestamp in response","schema":{"type":"boolean","default":false},"index$":5},{"name":"precision","in":"query","required":false,"description":"Decimal precision for price values","schema":{"type":"string"},"index$":6}],"securitySource":"unspecified","securitySchemes":{"ApiKeyAuth":{"type":"apiKey","in":"header","name":"x-cg-demo-api-key","description":"Optional API key for higher rate limits (Pro accounts)"}}}})
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
  
