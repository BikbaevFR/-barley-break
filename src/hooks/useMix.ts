import { useEffect, useMemo, useRef, useState } from "react";
import { MixSpeed } from "../constants/mix";
import { calculateMixCount, getMixSpeed } from "../utils/mix";
import { useStopWatch } from "./useStopWatch";

// TODO:
// 1. Рефакторить
export const useMixCount = () => {
  const { time, stop: stopStopWatch, reset, start } = useStopWatch();
  const [mixCount, setMixCount] = useState<number>(0);

  useEffect(() => {
    setMixCount(calculateMixCount(time));
  }, [time]);

  const startStopWatch = () => {
    reset();
    start();
  };

  return { mixCount, setMixCount, startStopWatch, stopStopWatch };
};

// TODO:
// 1. Рефакторить
export const useMixSpeed = (isMix: boolean, mixCount: number): number => {
  const mixSpeed = useMemo(() => {
    if (isMix) return getMixSpeed(mixCount);

    return MixSpeed.SLOW;
  }, [isMix]);

  return mixSpeed;
};

// TODO:
// 1. Рефакторить
export const useMix = (func: () => void) => {
  const [isMix, setIsMix] = useState<boolean>(false);

  const { mixCount, setMixCount, startStopWatch, stopStopWatch } =
    useMixCount();

  const timerID = useRef<ReturnType<typeof setTimeout> | null>(null);

  const mixSpeed = useMixSpeed(isMix, mixCount);

  useEffect(() => {
    if (isMix && mixCount) {
      timerID.current = setTimeout(func, mixSpeed);
    }

    if (!mixCount) {
      stopMix();
    }
  }, [isMix, mixCount]);

  // TODO:
  // 1. Рефакторить
  const startMix = () => {
    setIsMix(true);
    stopStopWatch();
  };

  // TODO:
  // 1. Рефакторить
  const stopMix = () => {
    setIsMix(false);

    clearTime();
  };

  const clearTime = () => {
    timerID.current && clearTimeout(timerID.current);
    timerID.current = null;
  };

  return {
    isMix,
    mixCount,
    setMixCount,
    mixSpeed,
    startStopWatch,
    startMix,
  };
};
