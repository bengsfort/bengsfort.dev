/**
 * Clamps the number between the given min and max values.
 * @returns The value, or the min/max if the value exceeds either extreme.
 */
export function clamp(val: number, min: number, max: number) {
  return Math.min(Math.max(val, min), max);
}
