export function resolveStrategy(options: any) {
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

  const selected = priority.find(p =>
    strategies.some(s => s.key === p)
  );

  const selectedValue = strategies.find(s => s.key === selected)?.value;

  console.warn(
    `Multiple rounding strategies detected. Using "${selected}" and ignoring others.`
  );

  // ✅ return cleaned options
  return {
    ...options,
    currency: selected === 'currency' ? selectedValue : undefined,
    significant: selected === 'significant' ? selectedValue : undefined,
    step: selected === 'step' ? selectedValue : undefined,
    threshold: selected === 'threshold' ? selectedValue : undefined
  };
}