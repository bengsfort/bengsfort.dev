/**
 * Moves a number towards a target value by a maximum delta.
 * @param current The value.
 * @param target The target.
 * @param maxDelta The max length to move.
 * @returns The moved value.
 */
export const moveTowards = (current: number, target: number, maxDelta: number) => {
  if (Math.abs(target - current) <= maxDelta) {
    return target;
  }
  return current + Math.sign(target - current) * maxDelta;
};

/**
 * Clamps a number between a minimum and maximum value.
 * @param value The value.
 * @param min The minimum.
 * @param max The maximum.
 * @returns The clamped value.
 */
export const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max);
};
