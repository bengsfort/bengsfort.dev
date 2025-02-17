import { describe, expect, it } from "vitest";
import { clamp, lerp, lerpClamped } from "../utils";

describe("clamp", () => {
  it("should return the max value if given a value greater", () => {
    expect(clamp(50, -25, 25)).toEqual(25);
    expect(clamp(26, -25, 25)).toEqual(25);
  });

  it("should return the min value if given a value smaller", () => {
    expect(clamp(-50, -25, 25)).toEqual(-25);
    expect(clamp(-26, -25, 25)).toEqual(-25);
  });

  it("should return the same value if it is within the range", () => {
    expect(clamp(0, -25, 25)).toEqual(0);
    expect(clamp(9, 0, 10)).toEqual(9);
    expect(clamp(-0.9999, -1, 1)).toEqual(-0.9999);
  });
});

describe("lerp", () => {
  it("should interpolate the value to the target", () => {
    expect(lerp(50, 60, 0)).toEqual(50);

    expect(lerp(0, 1, 0.5)).toEqual(0.5);
    expect(lerp(10, 20, 0.1)).toEqual(11);
    expect(lerp(-5, 5, 0.25)).toEqual(-2.5);

    expect(lerp(0, 100, 1)).toEqual(100);
  });

  it("should extrapolate if given step > 1 or < 0", () => {
    expect(lerp(0, 10, -0.1)).toEqual(-1);
    expect(lerp(0, 10, 1.5)).toEqual(15);
    expect(lerp(0, 10, 2)).toEqual(20);
  });
});

describe("lerpClamped", () => {
  it("should clamp the lerp step to 0 and 1", () => {
    expect(lerpClamped(0, 10, -0.5)).toEqual(0);
    expect(lerpClamped(0, 10, 0.5)).toEqual(5);
    expect(lerpClamped(0, 10, 2)).toEqual(10);
  });
});
