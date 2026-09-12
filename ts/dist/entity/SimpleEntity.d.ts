import { CoingeckoEntityBase } from '../CoingeckoEntityBase';
import type { CoingeckoSDK } from '../CoingeckoSDK';
import type { Control } from '../types';
import type { Simple, SimpleLoadMatch } from '../CoingeckoTypes';
declare class SimpleEntity extends CoingeckoEntityBase<Simple> {
    constructor(client: CoingeckoSDK, entopts: any);
    make(this: SimpleEntity): SimpleEntity;
    load(this: any, reqmatch?: SimpleLoadMatch, ctrl?: Control): Promise<SimpleEntity>;
}
export { SimpleEntity };
