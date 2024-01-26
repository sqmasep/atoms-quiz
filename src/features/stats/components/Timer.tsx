"use client";

import { useEffect, useState } from "react";
import { useProgression } from "~/stores/progression";
import dayjs from "dayjs";

interface TimerProps {
  isRunning: boolean;
}

const Timer: React.FC<
  TimerProps & Omit<React.ComponentPropsWithoutRef<"span">, keyof TimerProps>
> = ({ isRunning, ...props }) => {
  const progression = useProgression();
  const [timer, setTimer] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(Date.now() - (progression.startTime ?? Date.now()));
    }, 10);

    if (progression.status === "ended") {
      clearInterval(interval);
      return;
    }

    if (progression.status === "reset") {
      setTimer(0);
      clearInterval(interval);
      return;
    }

    return () => clearInterval(interval);
  }, [
    progression.hasStarted,
    progression.startTime,
    isRunning,
    progression.status,
  ]);

  return <span {...props}>{dayjs(timer).format("mm:ss:SSS")}</span>;
};

export default Timer;
