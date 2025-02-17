export const clamp = (val: number, min: number, max: number): number => {
  return Math.min(max, Math.max(min, val));
};

export const lerp = (val: number, target: number, step: number): number => {
  return val + (target - val) * step;
};

export const lerpClamped = (
  val: number,
  target: number,
  step: number,
): number => {
  return clamp(lerp(val, target, step), val, target);
};
