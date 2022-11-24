import {
  MAX_MIX_COUNT,
  MAX_SCALE_WIDTH,
  MixSpeed,
  SCALE_STEP,
} from "../constants/mix";

export const calculateMixCount = (time: number): number => {
  const mixCount = Math.trunc((time / 300) * 10);

  if (mixCount >= MAX_MIX_COUNT) return MAX_MIX_COUNT;
  return mixCount;
};

export const calculateScaleWidth = (mixCount: number): number => {
  const scaleWidth = mixCount * SCALE_STEP;

  if (scaleWidth >= MAX_SCALE_WIDTH) return MAX_SCALE_WIDTH;
  return scaleWidth;
};

export const getMixSpeed = (mixCount: number): number => {
  if (mixCount >= 30) return MixSpeed.FAST;
  if (mixCount <= 15) return MixSpeed.SLOW;

  return MixSpeed.NORMAL;
};
