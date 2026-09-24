"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoingeckoError = void 0;
class CoingeckoError extends Error {
    isCoingeckoError = true;
    sdk = 'Coingecko';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.CoingeckoError = CoingeckoError;
//# sourceMappingURL=CoingeckoError.js.map