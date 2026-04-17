# Roundify

Rounding utility for JavaScript & TypeScript with support for multiple rounding strategies, currency precision, and configurable rules.


## 🚀 Features

- Multiple rounding modes (standard, floor, ceil, bankers, etc.)
- Currency-aware rounding (INR, USD, JPY, KWD, etc.)
- Step and threshold rounding
- Includes advanced rounding modes such as significant-figure rounding for scientific and analytical use cases
- Type-safe API
- Extensible currency configuration


## 📦 Installation

npm install Roundify

## Usage 

// Standard rounding
Roundify(564.35, { decimals: 1 }); // 564.4

// Step rounding
Roundify(562, { step: 10 }); // 560

// Currency rounding
Roundify(123.456, { currency: 'INR' }); // 123.46

// Significant figures
Roundify(0.012345, { significant: 2 }); // 0.012

// Bankers rounding
Roundify(2.5, { mode: 'bankers' }); // 2

## 🧠 Rounding Modes
standard
floor
ceil
truncate
half-up
half-down
bankers
half-up-to-integer
toward-zero
away-from-zero

## ⚠️ Validation Rules
Only one of currency, step, significant, or threshold can be used at a time

Invalid combinations are resolved using priority:

currency > significant > step > threshold

