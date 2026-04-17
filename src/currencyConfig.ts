export const currencyConfig: Record<string, number> = {
  // Common currencies
  INR: 2, // Indian Rupee
  USD: 2, // US Dollar
  EUR: 2, // Euro
  GBP: 2, // British Pound

  // Zero decimal currencies
  JPY: 0, // Japanese Yen
  KRW: 0, // South Korean Won
  VND: 0, // Vietnamese Dong
  CLP: 0, // Chilean Peso

  // 3 decimal currencies
  KWD: 3, // Kuwaiti Dinar
  BHD: 3, // Bahraini Dinar
  OMR: 3, // Omani Rial
  JOD: 3, // Jordanian Dinar

  // Others
  AED: 2, // UAE Dirham
  SGD: 2, // Singapore Dollar
  AUD: 2, // Australian Dollar
  CAD: 2, // Canadian Dollar
  CHF: 2, // Swiss Franc
  CNY: 2  // Chinese Yuan
};

let customCurrencyConfig = { ...currencyConfig };

export function setCurrencyConfig(config: Record<string, number>) {
  customCurrencyConfig = { ...customCurrencyConfig, ...config };
}

export function getCurrencyDecimals(currency: string): number {
  return customCurrencyConfig[currency] ?? 2;
}

export function getCurrencyConfig() {
  return { ...customCurrencyConfig };
}