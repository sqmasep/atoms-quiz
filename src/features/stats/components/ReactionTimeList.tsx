import { COLORS } from "~/data/colors";
import { cn } from "~/lib/utils";
import { useProgression } from "~/stores/progression";
import { useSettings } from "~/stores/settings";

interface ReactionTimeListProps {}

const ReactionTimeList: React.FC<
  ReactionTimeListProps &
    Omit<React.ComponentPropsWithoutRef<"div">, keyof ReactionTimeListProps>
> = ({ ...props }) => {
  const progression = useProgression();
  const settings = useSettings();

  return (
    <div
      {...props}
      className={cn(
        "scrollbar-track-zinc-950 scrollbar-thin scrollbar-thumb-zinc-50 flex max-h-80 flex-col overflow-y-scroll rounded-lg border border-border p-4",
        props.className,
      )}
    >
      {/* Each row */}
      {progression.reactionTime.map((reaction, index) => {
        const atom = progression.atoms[index];
        const isSkipped = reaction.isSkipped;

        return (
          <div
            key={atom?.atomicNumber}
            className="grid grid-cols-9 items-center justify-between gap-1 rounded p-1 hover:bg-zinc-800/25"
          >
            {/* Position */}
            <span className="select-none text-[.65rem] text-zinc-500">
              #{index + 1}
            </span>

            <div
              className={cn(
                "col-span-2 inline-flex items-center gap-2",
                isSkipped && "opacity-25",
              )}
            >
              {/* Square (symbol) */}
              <span
                className={cn(
                  "relative grid aspect-square w-7 select-none place-items-center overflow-clip rounded border p-0.5 text-xs",
                  isSkipped && "line-through",
                )}
              >
                <span
                  className="absolute inset-1.5 -z-10 blur-xl"
                  style={{
                    backgroundColor: `${COLORS.block[atom?.block ?? "s"]}66`,
                  }}
                />
                {atom?.symbol}
              </span>

              {/* Name & atomic number */}
              <span
                className={cn(
                  "inline-flex items-center gap-1 text-sm",
                  isSkipped && "line-through",
                )}
              >
                {atom?.name.en}
                <span className="text-xs text-zinc-500">
                  {atom?.atomicNumber}
                </span>
              </span>
            </div>

            {/* Skipped */}
            <span className="col-span-4 text-xs text-red-950">
              {isSkipped && "Skipped"}
            </span>

            {/* Time */}
            <span
              className={cn(
                "text-xs font-bold",
                isSkipped && "line-through opacity-25",
                reaction.time > 3000 && "text-gray-500",
                reaction.time < 2700 && "text-zinc-400",
                reaction.time < 2300 && "text-red-400",
                reaction.time < 2000 && "text-orange-300",
                reaction.time < 1500 && "text-lime-300",
                reaction.time < 1300 && "text-emerald-400",
                reaction.time < 1000 && "text-amber-300",
                reaction.time < 900 && "text-amber-500",
                reaction.time < 750 && "text-purple-300",
                reaction.time < 500 && "text-purple-700",
              )}
            >
              {reaction.time / 1000}s
            </span>

            {/* Chars/s */}
            <span
              className={cn("text-xs", isSkipped && "line-through opacity-25")}
            >
              {(
                progression.atoms[index]?.name.en.length /
                (progression.reactionTime[index]?.time / 1000)
              ).toFixed(2)}{" "}
              <span className="text-zinc-500">chars/s</span>
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default ReactionTimeList;
