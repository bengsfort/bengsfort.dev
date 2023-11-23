export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

type RangeTuple = Readonly<[min: number, max: number]>;
export function transformRange(value: number, from: RangeTuple, to: RangeTuple): number {
  const [oldMin, oldMax] = from;
  const [newMin, newMax] = to;

  return ((value - oldMin) * (newMax - newMin)) / (oldMax - oldMin) + newMin;
}
