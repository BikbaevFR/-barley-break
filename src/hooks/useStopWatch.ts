import { useEffect, useRef, useState } from "react";

export const useStopWatch = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  const timerID = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerID.current) {
        clearInterval(timerID.current);
      }
    };
  }, []);

  useEffect(() => {
    if (running) {
      timerID.current = setInterval(() => {
        setTime((prevTime) => prevTime + 100);
      }, 100);
      return;
    }

    if (timerID.current) {
      clearInterval(timerID.current);
      return;
    }
  }, [running]);

  const start = () => setRunning(true);
  const stop = () => setRunning(false);
  const reset = () => setTime(0);

  return { time, stop, reset, start };
};
