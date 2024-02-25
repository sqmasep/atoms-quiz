import { cx } from "class-variance-authority";

export const getReactionTimeColor = (time: number) => {
  return cx(
    time > 3000 && "text-gray-500",
    time < 2700 && "text-zinc-400",
    time < 2300 && "text-red-400",
    time < 2000 && "text-orange-300",
    time < 1500 && "text-lime-300",
    time < 1300 && "text-emerald-400",
    time < 1000 && "text-amber-300",
    time < 900 && "text-amber-500",
    time < 750 && "text-purple-300",
    time < 500 && "text-purple-700",
  );
};
