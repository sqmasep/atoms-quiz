"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

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
      <span className="text-lg text-slate-400">/{outOf}</span>
    </div>
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger>
          <span className="text-green-400">{correctCount}</span>
        </TooltipTrigger>
        <TooltipContent>Correct</TooltipContent>
      </Tooltip>
    </TooltipProvider>
    {incorrectCount > 0 && (
      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger>
            <span className="text-red-400">{incorrectCount}</span>
          </TooltipTrigger>
          <TooltipContent>Incorrect</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )}
    {skippedCount > 0 && (
      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger>
            <span className="text-amber-500">{skippedCount}</span>
          </TooltipTrigger>
          <TooltipContent>Skipped</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )}
  </div>
);

export default AtomsCounter;
