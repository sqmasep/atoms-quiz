"use client";

import { useEffect, useState } from "react";
import { useProgression } from "~/stores/progression";
import dayjs from "dayjs";

interface TimerProps {
  isRunning: boolean;
  finalTime: number | null | false;
}

const Timer: React.FC<TimerProps> = ({ isRunning, finalTime }) => {
  const progression = useProgression();
  const [timer, setTimer] = useState<number>(0);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimer(Date.now() - (progression.startTime || 0));
    }, 100);

    return () => clearInterval(interval);
  }, [progression.hasStarted, progression.startTime, isRunning]);

  // return <div>{dayjs(finalTime || timer * 1000).format("mm:ss")}</div>;

  return (
    <div>
      <pre>{JSON.stringify(timer, null, 2)}</pre>

      {dayjs(timer / 1000).format("mm:ss")}
    </div>
  );
};

export default Timer;
