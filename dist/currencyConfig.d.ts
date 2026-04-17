export declare const currencyConfig: Record<string, number>;
export declare function setCurrencyConfig(config: Record<string, number>): void;
export declare function getCurrencyDecimals(currency: string): number;
export declare function getCurrencyConfig(): {
    [x: string]: number;
};
