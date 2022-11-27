import { useEffect, useMemo, useRef, useState } from "react";
import { OPPOSITE_DIRECTION } from "../constants/direction";
import { MixSpeed } from "../constants/mix";
import { DirectionStrings, ICell } from "../types";
import { getRandomDirection } from "../utils/direction";
import { calculateMixCount, getMixSpeed } from "../utils/mix";
import { useStopWatch } from "./useStopWatch";

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

export const useMixing = (
  cells: ICell[],
  makeMove: (
    isForward: boolean,
    index: number | null,
    direction: DirectionStrings | null
  ) => void
) => {
  const [isMix, setIsMix] = useState<boolean>(false);
  const [excludedDirection, setExcludedDirection] =
    useState<DirectionStrings | null>(null);

  const { mixCount, setMixCount, startStopWatch, stopStopWatch } =
    useMixCount();

  const timerID = useRef<ReturnType<typeof setTimeout> | null>(null);

  const mixSpeed = useMemo(() => {
    if (isMix) return getMixSpeed(mixCount);

    return MixSpeed.SLOW;
  }, [isMix]);

  useEffect(() => {
    if (isMix && mixCount) {
      timerID.current = setTimeout(mix, mixSpeed);
    }

    if (!mixCount) {
      stopMixing();
    }
  }, [isMix, mixCount]);

  const startMixing = () => {
    setIsMix(true);
    stopStopWatch();
  };

  const stopMixing = () => {
    setIsMix(false);
    clearTimer();
  };

  const clearTimer = () => {
    timerID.current && clearTimeout(timerID.current);
    timerID.current = null;
  };

  const decreaseMixCount = () => {
    if (!mixCount) return setMixCount(0);

    setMixCount((prev) => prev - 1);
  };

  const mix = () => {
    const randomDirection = getRandomDirection(cells, excludedDirection);
    setExcludedDirection(OPPOSITE_DIRECTION[randomDirection]);

    makeMove(false, null, randomDirection);
  };

  return {
    isMix,
    mixCount,
    decreaseMixCount,
    mixSpeed,
    startStopWatch,
    startMixing,
  };
};
