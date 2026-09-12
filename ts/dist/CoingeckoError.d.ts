import { Context } from './Context';
declare class CoingeckoError extends Error {
    isCoingeckoError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { CoingeckoError };
