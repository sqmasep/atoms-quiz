"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import RollingCounter from "./RollingCounter";

interface AtomsCounterProps {
  currentCount: number;
  outOf: number;
  correctCount: number;
  incorrectCount: number;
  skippedCount: number;
}

const AtomsCounter: React.FC<AtomsCounterProps> = ({
  currentCount,
  outOf,
  correctCount,
  incorrectCount,
  skippedCount,
}) => (
  <div className="flex items-center justify-center gap-4">
    <div className="flex items-end font-mono">
      <span className="text-2xl font-bold">{currentCount}</span>
      <span className="text-lg text-zinc-500">/{outOf}</span>
    </div>

    <div className="relative z-10 flex items-center gap-4 overflow-clip rounded-full border border-solid border-zinc-800 px-4 ">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger tabIndex={-1}>
            <RollingCounter
              prevCountProps={{ className: "text-green-700 opacity-25" }}
              countProps={{ className: "text-green-400" }}
              nextCountProps={{ className: "text-green-700 opacity-25" }}
              count={correctCount}
            />
          </TooltipTrigger>
          <TooltipContent>Correct</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger tabIndex={-1}>
            <RollingCounter
              prevCountProps={{ className: "text-red-700 opacity-25" }}
              countProps={{ className: "text-red-400" }}
              nextCountProps={{ className: "text-red-700 opacity-25" }}
              count={incorrectCount}
            />
            {/* <AnimatePresence mode="popLayout">
              <motion.span
                className="block text-red-400"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                key={incorrectCount}
              >
                {incorrectCount}
              </motion.span>
            </AnimatePresence> */}
          </TooltipTrigger>
          <TooltipContent>Incorrect</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger tabIndex={-1}>
            <RollingCounter
              count={skippedCount}
              prevCountProps={{ className: "text-amber-700 opacity-25" }}
              countProps={{ className: "text-amber-400" }}
              nextCountProps={{ className: "text-amber-700 opacity-25" }}
            />
          </TooltipTrigger>
          <TooltipContent>Skipped</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  </div>
);

export default AtomsCounter;
