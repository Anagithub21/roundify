"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFactor = getFactor;
exports.fixPrecision = fixPrecision;
function getFactor(decimals) {
    return Math.pow(10, decimals);
}
function fixPrecision(value) {
    return Number(value.toFixed(12));
}
