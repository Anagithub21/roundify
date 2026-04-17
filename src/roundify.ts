import { RoundOptions } from "./types";
import { bankersRound } from "./modes";
import { getFactor, fixPrecision } from "./utils";
import { getCurrencyDecimals } from "./currencyConfig";
import { resolveStrategy } from "./validators";

export function Roundify(value: number, options: RoundOptions = {}): number {
  if (typeof value !== "number" || isNaN(value)) {
    throw new Error("Roundify: value must be a valid number");
  }

  if ("decimals" in options && options.decimals !== undefined) {
    if (options.decimals < 0) {
      throw new Error("Roundify: decimals must be >= 0");
    }
  }

  if ("step" in options && options.step !== undefined) {
    if (options.step <= 0) {
      throw new Error("Roundify: step must be > 0");
    }
  }

  if ("threshold" in options && options.threshold !== undefined) {
    if (options.threshold < 0 || options.threshold > 1) {
      throw new Error("Roundify: threshold must be between 0 and 1");
    }
  }

  if ("significant" in options && options.significant !== undefined) {
    if (options.significant <= 0) {
      throw new Error("Roundify: significant must be > 0");
    }
  }

  options = resolveStrategy(options);

  const {
    decimals = 0,
    mode = "standard",
    step,
    threshold,
    significant,
    currency,
    clamp,
  } = options;

  // ✅ 1. Currency rounding
  if (currency) {
    const currencyDecimals = getCurrencyDecimals(currency);
    return Roundify(value, { decimals: currencyDecimals });
  }

  // ✅ 2. Significant figures
  if (significant) {
    if (value === 0) return 0;
    const factor = Math.pow(
      10,
      significant - Math.ceil(Math.log10(Math.abs(value))),
    );
    return Math.round(value * factor) / factor;
  }

  // ✅ 3. Step rounding
  if (step) {
    return Math.round(value / step) * step;
  }

  // ✅ 4. Threshold rounding
  if (threshold !== undefined) {
    const intPart = Math.floor(value);
    const decimal = value - intPart;

    return decimal >= threshold ? intPart + 1 : intPart;
  }

  // base decimal logic
  const factor = getFactor(decimals);
  let temp = fixPrecision(value * factor);

  switch (mode) {
    case "floor":
      temp = Math.floor(temp);
      break;

    case "ceil":
      temp = Math.ceil(temp);
      break;

    case "truncate":
      temp = temp < 0 ? Math.ceil(temp) : Math.floor(temp);
      break;

    case "half-down":
      temp = temp % 1 === 0.5 ? Math.floor(temp) : Math.round(temp);
      break;

    case "bankers":
      temp = bankersRound(temp);
      break;

    case "toward-zero":
      temp = temp < 0 ? Math.ceil(temp) : Math.floor(temp);
      break;

    case "away-from-zero":
      temp = temp < 0 ? Math.floor(temp) : Math.ceil(temp);
      break;

    case "half-up-to-integer":
      if (value % 1 >= 0.5) return Math.ceil(value);
      return Math.floor(temp) / factor;

    default:
      temp = Math.round(temp);
  }

  let result = temp / factor;

  // ✅ 5. Clamp floating issues
  if (clamp) {
    result = Number(result.toFixed(decimals));
  }

  return result;
}
