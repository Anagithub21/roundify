import { Roundify, setCurrencyConfig } from "../src";

describe("Roundify - core rounding", () => {
  test("decimal rounding", () => {
    expect(Roundify(564.31, { decimals: 1 })).toBe(564.3);
    expect(Roundify(564.35, { decimals: 1 })).toBe(564.4);
  });

  test("floor and ceil", () => {
    expect(Roundify(5.9, { mode: "floor" })).toBe(5);
    expect(Roundify(5.1, { mode: "ceil" })).toBe(6);
  });

  test("truncate", () => {
    expect(Roundify(5.9, { mode: "truncate" })).toBe(5);
  });
});

describe("Roundify - advanced modes", () => {
  test("bankers rounding", () => {
    expect(Roundify(2.5, { mode: "bankers" })).toBe(2);
    expect(Roundify(3.5, { mode: "bankers" })).toBe(4);
  });

  test("half-up-to-integer", () => {
    expect(Roundify(564.35, { mode: "half-up-to-integer" })).toBe(564);
  });

  test("toward-zero / away-from-zero", () => {
    expect(Roundify(-2.3, { mode: "toward-zero" })).toBe(-2);
    expect(Roundify(-2.3, { mode: "away-from-zero" })).toBe(-3);
  });
});

describe("Roundify - step & threshold", () => {
  test("step rounding", () => {
    expect(Roundify(562, { step: 10 })).toBe(560);
    expect(Roundify(564, { step: 5 })).toBe(565);
  });

  test("threshold rounding", () => {
    expect(Roundify(564.31, { threshold: 0.3 })).toBe(565);
    expect(Roundify(564.29, { threshold: 0.3 })).toBe(564);
  });
});

describe("Roundify - significant figures", () => {
  test("significant rounding", () => {
    expect(Roundify(0.012345, { significant: 2 })).toBe(0.012);
    expect(Roundify(12345, { significant: 3 })).toBe(12300);
  });
});

describe("Roundify - currency", () => {
  test("default currency", () => {
    expect(Roundify(123.456, { currency: "INR" })).toBe(123.46);
    expect(Roundify(123.456, { currency: "USD" })).toBe(123.46);
  });

  test("zero decimal currency", () => {
    expect(Roundify(123.456, { currency: "JPY" })).toBe(123);
  });

  test("three decimal currency", () => {
    expect(Roundify(1.23456, { currency: "KWD" })).toBe(1.235);
  });

  test("custom currency config", () => {
    setCurrencyConfig({ BTC: 8 });

    expect(Roundify(0.123456789, { currency: "BTC" as any })).toBe(0.12345679);
  });
});

describe("Roundify - edge cases", () => {
  test("NaN and null", () => {
    expect(() => Roundify(NaN)).toThrow("value must be a valid number");

    expect(() => Roundify("123" as any)).toThrow(
      "value must be a valid number",
    );
  });

  test("floating precision fix", () => {
    expect(Roundify(0.1 + 0.2, { decimals: 2 })).toBe(0.3);
  });

  test("conflicting options resolves by priority", () => {
    const result = Roundify(123.456, {
      currency: "INR",
      step: 10,
    } as any);

    expect(result).toBe(123.46); // currency wins
  });

  test("negative numbers", () => {
    expect(Roundify(-2.5, { mode: "bankers" })).toBe(-2);
  });

  test("large numbers", () => {
    expect(Roundify(999999999.999, { decimals: 2 })).toBe(1000000000);
  });

  test("zero handling", () => {
    expect(Roundify(0, { decimals: 2 })).toBe(0);
  });
});
