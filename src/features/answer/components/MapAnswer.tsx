import PeriodicTable from "~/features/map/components/PeriodicTable";
import useModes from "~/hooks/useModes";
import { cn } from "~/lib/utils";
import type { AtomType } from "~/lib/validation/atomSchema";
import { useDefaultAtoms } from "~/stores/defaultAtoms";
import { useProgression } from "~/stores/progression";

interface MapAnswerProps {}

const MapAnswer: React.FC<
  MapAnswerProps &
    Omit<React.ComponentPropsWithoutRef<"div">, keyof MapAnswerProps>
> = ({ ...props }) => {
  const defaultAtoms = useDefaultAtoms();
  const modes = useModes();
  const progression = useProgression();

  const handleGuess = (atom: AtomType) => () => {
    if (atom.atomicNumber === progression.currentAtom?.atomicNumber) {
      progression.incrementCorrect();
      progression.nextQuestion();
    } else {
      progression.incrementIncorrect();
    }
  };

  return (
    <div {...props}>
      <PeriodicTable
        className="gap-0.5"
        atoms={defaultAtoms.atoms}
        renderAtom={atom => (
          <button
            type="button"
            onClick={handleGuess(atom)}
            className={cn(
              "relative grid aspect-square w-8 place-items-center rounded-md border border-border text-sm font-bold hover:bg-zinc-800/25",
              progression.hasAtomPassed(atom.atomicNumber) && "bg-blue-900",
            )}
          >
            <span
              className={cn("absolute left-1 top-1 text-[.25rem] leading-none")}
            >
              {atom.atomicNumber}
            </span>
            <span className={cn("blur-[2px]")}>{atom.symbol}</span>
          </button>
        )}
      />
    </div>
  );
};

export default MapAnswer;
