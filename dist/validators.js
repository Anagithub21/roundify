"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveStrategy = resolveStrategy;
function resolveStrategy(options) {
    var _a;
    const strategies = [
        { key: 'currency', value: options.currency },
        { key: 'significant', value: options.significant },
        { key: 'step', value: options.step },
        { key: 'threshold', value: options.threshold }
    ].filter(s => s.value !== undefined);
    // ✅ No conflict
    if (strategies.length <= 1) {
        return options;
    }
    // 🔥 Priority order
    const priority = ['currency', 'significant', 'step', 'threshold'];
    const selected = priority.find(p => strategies.some(s => s.key === p));
    const selectedValue = (_a = strategies.find(s => s.key === selected)) === null || _a === void 0 ? void 0 : _a.value;
    console.warn(`Multiple rounding strategies detected. Using "${selected}" and ignoring others.`);
    // ✅ return cleaned options
    return {
        ...options,
        currency: selected === 'currency' ? selectedValue : undefined,
        significant: selected === 'significant' ? selectedValue : undefined,
        step: selected === 'step' ? selectedValue : undefined,
        threshold: selected === 'threshold' ? selectedValue : undefined
    };
}
