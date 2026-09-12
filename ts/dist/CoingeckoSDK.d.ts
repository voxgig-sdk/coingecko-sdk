import { GeneralEntity } from './entity/GeneralEntity';
import { SimpleEntity } from './entity/SimpleEntity';
export type * from './CoingeckoTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { CoingeckoEntityBase } from './CoingeckoEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class CoingeckoSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    General(entopts?: Record<string, any>): GeneralEntity;
    Simple(entopts?: Record<string, any>): SimpleEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): CoingeckoSDK;
    tester(testopts?: any, sdkopts?: any): CoingeckoSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof CoingeckoSDK;
export { stdutil, config, BaseFeature, CoingeckoEntityBase, CoingeckoSDK, SDK, };
