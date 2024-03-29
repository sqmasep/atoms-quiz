import { motion } from "framer-motion";
import { cn } from "~/lib/utils";

interface ReactionTimeProps {
  time: number;
}

const ReactionTime: React.FC<
  ReactionTimeProps &
    Omit<
      React.ComponentPropsWithoutRef<typeof motion.span>,
      keyof ReactionTimeProps
    >
> = ({ time, ...props }) => {
  return (
    <motion.span
      {...props}
      animate={{
        y: [15, 0, 0, -15],
        opacity: [0, 1, 1, 0],
      }}
      className={
        // TODO [REFACTOR] use a function to get the color, doesn't work really well with tailwind
        cn(
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
        )
      }
    >
      {(time / 1000).toFixed(3)}
    </motion.span>
  );
};

export default ReactionTime;
