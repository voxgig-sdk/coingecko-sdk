export interface General {
    gecko_says?: string;
}
export interface GeneralLoadMatch {
    gecko_says?: string;
}
export interface Simple {
    bitcoin?: Record<string, any>;
    ethereum?: Record<string, any>;
}
export interface SimpleLoadMatch {
    ids: string;
    include_24hr_change?: boolean;
    include_24hr_vol?: boolean;
    include_last_updated_at?: boolean;
    include_market_cap?: boolean;
    precision?: string;
    vs_currency: string;
    $action?: string;
    [action: string]: any;
}
