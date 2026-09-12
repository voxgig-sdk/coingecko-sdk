import { CoingeckoEntityBase } from '../CoingeckoEntityBase';
import type { CoingeckoSDK } from '../CoingeckoSDK';
import type { Control } from '../types';
import type { General, GeneralLoadMatch } from '../CoingeckoTypes';
declare class GeneralEntity extends CoingeckoEntityBase<General> {
    constructor(client: CoingeckoSDK, entopts: any);
    make(this: GeneralEntity): GeneralEntity;
    load(this: any, reqmatch?: GeneralLoadMatch, ctrl?: Control): Promise<GeneralEntity>;
}
export { GeneralEntity };
