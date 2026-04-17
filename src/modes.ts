export function bankersRound(value: number): number {
  const floor = Math.floor(value);
  const diff = value - floor;

  if (diff > 0.5) return Math.ceil(value);
  if (diff < 0.5) return floor;

  return floor % 2 === 0 ? floor : floor + 1;
}