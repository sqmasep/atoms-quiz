import { AnimatePresence, motion } from "framer-motion";

interface CounterProps {
  count: number;
}

const Counter: React.FC<
  CounterProps & Omit<React.ComponentPropsWithoutRef<"div">, keyof CounterProps>
> = ({ count, ...props }) => {
  return (
    <div {...props}>
      {Array.from(count.toString()).map((n, i) => (
        <AnimatePresence mode="popLayout" key={`correct-${n}${i}-container`}>
          <motion.span
            className="flex whitespace-nowrap"
            initial={{ y: 20, opacity: 1 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 1 }}
            key={`correct-${n}${i}`}
          >
            {n}
          </motion.span>
        </AnimatePresence>
      ))}
    </div>
  );
};

export default Counter;
