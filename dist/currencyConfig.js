"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.currencyConfig = void 0;
exports.setCurrencyConfig = setCurrencyConfig;
exports.getCurrencyDecimals = getCurrencyDecimals;
exports.getCurrencyConfig = getCurrencyConfig;
exports.currencyConfig = {
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
    CNY: 2 // Chinese Yuan
};
let customCurrencyConfig = { ...exports.currencyConfig };
function setCurrencyConfig(config) {
    customCurrencyConfig = { ...customCurrencyConfig, ...config };
}
function getCurrencyDecimals(currency) {
    var _a;
    return (_a = customCurrencyConfig[currency]) !== null && _a !== void 0 ? _a : 2;
}
function getCurrencyConfig() {
    return { ...customCurrencyConfig };
}
