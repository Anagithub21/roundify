export type RoundMode =
  | 'standard'
  | 'floor'
  | 'ceil'
  | 'truncate'
  | 'half-up'
  | 'half-down'
  | 'bankers'
  | 'half-up-to-integer'
  | 'toward-zero'
  | 'away-from-zero';

export type CurrencyCode =
  | 'INR' | 'USD' | 'EUR' | 'GBP'
  | 'JPY' | 'KRW' | 'VND' | 'CLP'
  | 'KWD' | 'BHD' | 'OMR' | 'JOD'
  | 'AED' | 'SGD' | 'AUD' | 'CAD'
  | 'CHF' | 'CNY';

export interface RoundOptions {
  decimals?: number;
  
  //modes
  mode?: RoundMode;

  //advanced
  step?: number;
  threshold?: number;
  significant?: number;
  currency?: CurrencyCode;

  // safety
  clamp?: boolean;
}