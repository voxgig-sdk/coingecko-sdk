"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('SimpleEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COINGECKO_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COINGECKO_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.CoingeckoSDK.test();
        const ent = testsdk.Simple();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COINGECKO_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'simple.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [], "name": "simple", "op": { "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "query": [{ "active": true, "example": "bitcoin,ethereum", "kind": "query", "name": "ids", "orig": "ids", "reqd": true, "type": "`$STRING`", "index$": 0 }, { "active": true, "example": false, "kind": "query", "name": "include_24hr_change", "orig": "include_24hr_change", "reqd": false, "type": "`$BOOLEAN`", "index$": 1 }, { "active": true, "example": false, "kind": "query", "name": "include_24hr_vol", "orig": "include_24hr_vol", "reqd": false, "type": "`$BOOLEAN`", "index$": 2 }, { "active": true, "example": false, "kind": "query", "name": "include_last_updated_at", "orig": "include_last_updated_at", "reqd": false, "type": "`$BOOLEAN`", "index$": 3 }, { "active": true, "example": false, "kind": "query", "name": "include_market_cap", "orig": "include_market_cap", "reqd": false, "type": "`$BOOLEAN`", "index$": 4 }, { "active": true, "kind": "query", "name": "precision", "orig": "precision", "reqd": false, "type": "`$STRING`", "index$": 5 }, { "active": true, "example": "usd,eur", "kind": "query", "name": "vs_currency", "orig": "vs_currency", "reqd": true, "type": "`$STRING`", "index$": 6 }] }, "contract": { "id": "GET /simple/price", "json": "{\"operationId\":\"getSimplePrice\",\"parameters\":[{\"description\":\"ID of coins, comma-separated if querying more than 1 coin (e.g. bitcoin,ethereum)\",\"example\":\"bitcoin,ethereum\",\"in\":\"query\",\"name\":\"ids\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Target currency of market data, comma-separated if querying more than 1 currency (e.g. usd,eur)\",\"example\":\"usd,eur\",\"in\":\"query\",\"name\":\"vs_currencies\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Include market cap in response\",\"in\":\"query\",\"name\":\"include_market_cap\",\"required\":false,\"schema\":{\"default\":false,\"type\":\"boolean\"}},{\"description\":\"Include 24hr volume in response\",\"in\":\"query\",\"name\":\"include_24hr_vol\",\"required\":false,\"schema\":{\"default\":false,\"type\":\"boolean\"}},{\"description\":\"Include 24hr price change in response\",\"in\":\"query\",\"name\":\"include_24hr_change\",\"required\":false,\"schema\":{\"default\":false,\"type\":\"boolean\"}},{\"description\":\"Include last updated timestamp in response\",\"in\":\"query\",\"name\":\"include_last_updated_at\",\"required\":false,\"schema\":{\"default\":false,\"type\":\"boolean\"}},{\"description\":\"Decimal precision for price values\",\"in\":\"query\",\"name\":\"precision\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"bitcoin\":{\"eur\":42000,\"last_updated_at\":1640000000,\"usd\":45000,\"usd_24h_change\":2.5,\"usd_24h_vol\":35000000000,\"usd_market_cap\":850000000000},\"ethereum\":{\"eur\":3200,\"last_updated_at\":1640000000,\"usd\":3500,\"usd_24h_change\":1.8,\"usd_24h_vol\":18000000000,\"usd_market_cap\":420000000000}},\"schema\":{\"additionalProperties\":{\"additionalProperties\":{\"type\":\"number\"},\"type\":\"object\"},\"type\":\"object\"}}},\"description\":\"Successful response with cryptocurrency prices\"},\"400\":{\"description\":\"Bad request - invalid parameters\"},\"429\":{\"description\":\"Rate limit exceeded\"}},\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"Optional API key for higher rate limits (Pro accounts)\",\"in\":\"header\",\"name\":\"x-cg-demo-api-key\",\"type\":\"apiKey\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/simple/price", "segments": [{ "lit": "simple" }, { "lit": "price" }], "select": { "$action": "price", "exist": ["ids", "include_24hr_change", "include_24hr_vol", "include_last_updated_at", "include_market_cap", "precision", "vs_currency"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "simple", "name__orig": "simple", "Name": "Simple", "name_": "simple", "name-": "simple", "NAME": "SIMPLE", "index$": 1 }, { "active": true, "entity": "simple", "key$": "BasicSimpleFlow", "kind": "basic", "name": "BasicSimpleFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "simple_ref01", "srcdatavar": "simple_ref01_data", "suffix": "_dt0" }, "match": {}, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-simple_ref01" } }], "index$": 0 }] }, 'Simple');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let simple_ref01_data = Object.values(setup.data.existing.simple)[0];
        // LOAD
        const simple_ref01_ent = client.Simple();
        const simple_ref01_match_dt0 = {};
        const simple_ref01_data_dt0 = (await simple_ref01_ent.load(simple_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != simple_ref01_data_dt0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/simple/SimpleTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.CoingeckoSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['simple01', 'simple02', 'simple03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COINGECKO_TEST_SIMPLE_ENTID': idmap,
        'COINGECKO_TEST_LIVE': 'FALSE',
        'COINGECKO_TEST_EXPLAIN': 'FALSE',
        'COINGECKO_APIKEY': '',
    });
    idmap = env['COINGECKO_TEST_SIMPLE_ENTID'];
    const live = 'TRUE' === env.COINGECKO_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COINGECKO_TEST_SIMPLE_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.CoingeckoSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
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
        ]));
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
    };
    return setup;
}
//# sourceMappingURL=SimpleEntity.test.js.map