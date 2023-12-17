import { cn } from "~/lib/utils";
import Counter from "./Counter";

type CounterPropsWithoutCount = Omit<
  React.ComponentPropsWithoutRef<typeof Counter>,
  "count"
>;

interface RollingCounterProps {
  count: number;
  prevCountProps?: CounterPropsWithoutCount;
  countProps?: CounterPropsWithoutCount;
  nextCountProps?: CounterPropsWithoutCount;
}

const RollingCounter: React.FC<
  RollingCounterProps &
    Omit<React.ComponentPropsWithoutRef<"div">, keyof RollingCounterProps>
> = ({ count, prevCountProps, countProps, nextCountProps, ...props }) => {
  return (
    <div {...props} className={cn("py-2 font-mono", props.className)}>
      {count > 0 && (
        <Counter
          {...prevCountProps}
          className={cn("absolute -top-2.5 flex", prevCountProps?.className)}
          count={count - 1}
        />
      )}

      <Counter
        {...countProps}
        count={count}
        className={cn("flex", countProps?.className)}
      />

      <Counter
        {...nextCountProps}
        className={cn("absolute -bottom-2.5 flex", nextCountProps?.className)}
        count={count + 1}
      />
    </div>
  );
};

export default RollingCounter;
