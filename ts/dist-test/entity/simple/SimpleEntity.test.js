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
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": {}, "name": "simple", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /simple/price", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": "bitcoin,ethereum", "k": "query", "n": "ids", "or": "ids", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": false, "k": "query", "n": "include_24hr_change", "or": "include_24hr_change", "r": false, "t": "`$BOOLEAN`", "index$": 1 }, { "a": true, "ex": false, "k": "query", "n": "include_24hr_vol", "or": "include_24hr_vol", "r": false, "t": "`$BOOLEAN`", "index$": 2 }, { "a": true, "ex": false, "k": "query", "n": "include_last_updated_at", "or": "include_last_updated_at", "r": false, "t": "`$BOOLEAN`", "index$": 3 }, { "a": true, "ex": false, "k": "query", "n": "include_market_cap", "or": "include_market_cap", "r": false, "t": "`$BOOLEAN`", "index$": 4 }, { "a": true, "k": "query", "n": "precision", "or": "precision", "r": false, "t": "`$STRING`", "index$": 5 }, { "a": true, "ex": "usd,eur", "k": "query", "n": "vs_currency", "or": "vs_currency", "r": true, "t": "`$STRING`", "index$": 6 }] }, "k": "http", "m": "GET", "o": "/simple/price", "q": { "$action": "price", "exist": ["ids", "include_24hr_change", "include_24hr_vol", "include_last_updated_at", "include_market_cap", "precision", "vs_currency"] }, "r": {}, "s": [{ "lit": "simple" }, { "lit": "price" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "simple", "name__orig": "simple", "Name": "Simple", "name_": "simple", "name-": "simple", "NAME": "SIMPLE", "index$": 1 }, { "active": true, "entity": "simple", "key$": "BasicSimpleFlow", "kind": "basic", "name": "BasicSimpleFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "simple_ref01", "srcdatavar": "simple_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-simple_ref01" } }], "index$": 0 }] }, 'Simple', { "GET /simple/price": { "protocol": "http", "operationId": "getSimplePrice", "responses": { "200": { "description": "Successful response with cryptocurrency prices", "content": { "application/json": { "schema": { "type": "object", "additionalProperties": { "type": "object", "additionalProperties": { "type": "number" } } }, "example": { "bitcoin": { "usd": 45000, "eur": 42000, "usd_market_cap": 850000000000, "usd_24h_vol": 35000000000, "usd_24h_change": 2.5, "last_updated_at": 1640000000 }, "ethereum": { "usd": 3500, "eur": 3200, "usd_market_cap": 420000000000, "usd_24h_vol": 18000000000, "usd_24h_change": 1.8, "last_updated_at": 1640000000 } } } } }, "400": { "description": "Bad request - invalid parameters" }, "429": { "description": "Rate limit exceeded" } }, "parameters": [{ "name": "ids", "in": "query", "required": true, "description": "ID of coins, comma-separated if querying more than 1 coin (e.g. bitcoin,ethereum)", "schema": { "type": "string" }, "example": "bitcoin,ethereum", "index$": 0 }, { "name": "vs_currencies", "in": "query", "required": true, "description": "Target currency of market data, comma-separated if querying more than 1 currency (e.g. usd,eur)", "schema": { "type": "string" }, "example": "usd,eur", "index$": 1 }, { "name": "include_market_cap", "in": "query", "required": false, "description": "Include market cap in response", "schema": { "type": "boolean", "default": false }, "index$": 2 }, { "name": "include_24hr_vol", "in": "query", "required": false, "description": "Include 24hr volume in response", "schema": { "type": "boolean", "default": false }, "index$": 3 }, { "name": "include_24hr_change", "in": "query", "required": false, "description": "Include 24hr price change in response", "schema": { "type": "boolean", "default": false }, "index$": 4 }, { "name": "include_last_updated_at", "in": "query", "required": false, "description": "Include last updated timestamp in response", "schema": { "type": "boolean", "default": false }, "index$": 5 }, { "name": "precision", "in": "query", "required": false, "description": "Decimal precision for price values", "schema": { "type": "string" }, "index$": 6 }], "securitySource": "unspecified", "securitySchemes": { "ApiKeyAuth": { "type": "apiKey", "in": "header", "name": "x-cg-demo-api-key", "description": "Optional API key for higher rate limits (Pro accounts)" } } } });
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