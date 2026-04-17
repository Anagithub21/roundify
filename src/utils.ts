export function getFactor(decimals: number) {
  return Math.pow(10, decimals);
}

export function fixPrecision(value: number) {
  return Number(value.toFixed(12));
}