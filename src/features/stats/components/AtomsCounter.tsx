"use client";

import { AnimatePresence, motion } from "framer-motion";

interface AtomsCounterProps {
  currentCount: number;
  outOf: number;
}

const AtomsCounter: React.FC<AtomsCounterProps> = ({ currentCount, outOf }) => (
  <div className="flex items-end justify-center font-mono">
    <span className="text-2xl font-bold">{currentCount}</span>
    <span className="text-lg text-slate-400">/{outOf}</span>
  </div>
);

export default AtomsCounter;
