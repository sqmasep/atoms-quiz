"use client";

import { useEffect, useState } from "react";
import { useProgression } from "~/stores/progression";
import dayjs from "dayjs";

interface TimerProps {
  isRunning: boolean;
}

const Timer: React.FC<TimerProps> = ({ isRunning }) => {
  const progression = useProgression();
  const [timer, setTimer] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(Date.now() - (progression.startTime ?? Date.now()));
    }, 10);

    if (!isRunning) {
      clearInterval(interval);
      return;
    }

    return () => clearInterval(interval);
  }, [progression.hasStarted, progression.startTime, isRunning]);

  return <div>{dayjs(timer).format("mm:ss:SSS")}</div>;
};

export default Timer;
