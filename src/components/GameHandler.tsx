"use client";

import { useEffect } from "react";
import AnswerContainer from "~/features/answer/components/AnswerContainer";
import AtomsCounter from "~/features/stats/components/AtomsCounter";
import useModes from "~/hooks/useModes";
import Navbar from "~/layouts/Navbar";
import type { AtomsType } from "~/lib/validation/atomSchema";
import { useProgression } from "~/stores/progression";
import { Button } from "./ui/button";
import PeriodicTable from "~/features/map/components/PeriodicTable";
import { useSettings } from "~/stores/settings";
import RestartButton from "./RestartButton";
import Timer from "~/features/stats/components/Timer";
import { COLORS } from "~/data/colors";
import { AnimatePresence, motion } from "framer-motion";
import { CheckIcon } from "@radix-ui/react-icons";
import ReactionTime from "~/features/stats/components/ReactionTime";
// import AchievementsHandler from "~/features/achievements/components/AchievementsHandler";
import { cn } from "~/lib/utils";
import ReactionTimeList from "~/features/stats/components/ReactionTimeList";
import { useDefaultAtoms } from "~/stores/defaultAtoms";

interface GameHandlerProps {
  atoms: AtomsType;
}

const GameHandler: React.FC<
  GameHandlerProps &
    Omit<React.ComponentPropsWithoutRef<"div">, keyof GameHandlerProps>
> = ({ atoms, ...props }) => {
  const { collection, guess, sort } = useModes();
  const defaultAtoms = useDefaultAtoms();
  defaultAtoms.setAtoms(atoms);

  const progression = useProgression();
  const settings = useSettings();

  function setAtomsFromOptions() {
    const collectionAtoms =
      collection === "all"
        ? atoms
        : atoms.filter(atom => {
            if (collection === "s-block") return atom.block === "s";
            if (collection === "p-block") return atom.block === "p";
            if (collection === "d-block") return atom.block === "d";
            if (collection === "f-block") return atom.block === "f";
            // TODO other collection filters
            // if (collection === "alkali-metals") return atom.group === 1;
          });

    const sortedAtoms = collectionAtoms.toSorted((a, b) => {
      if (sort === "random") return Math.random() - 0.5;
      if (sort === "atomic-number") return a.atomicNumber - b.atomicNumber;
      if (sort === "alphabetical")
        return a.name[settings.guessLanguage].localeCompare(
          b.name[settings.guessLanguage],
        );
      return 0;
    });

    progression.setAtoms(sortedAtoms);

    return sortedAtoms;
  }

  useEffect(() => {
    progression.reset();
    setAtomsFromOptions();
  }, [sort, guess, collection]);

  function handlePlay() {
    progression.reset();
    progression.start();
    settings.toggleChangedSettingsDuringGame(false);

    const atoms = setAtomsFromOptions();
    progression.setCurrentAtom(atoms[0]);
  }

  return (
    <div {...props}>
      <Navbar />
      <div className="mt-6 flex items-center justify-center gap-2">
        <RestartButton />
        {/* <AchievementsHandler /> */}

        <AtomsCounter
          currentCount={progression.currentIndex + 1}
          outOf={progression.atoms.length}
          correctCount={progression.correctAnswers}
          incorrectCount={progression.incorrectAnswers}
          skippedCount={progression.skippedAnswers}
        />

        <Button
          size="sm"
          variant="outline"
          onClick={() => progression.isPlaying && progression.skip()}
        >
          Skip
        </Button>
      </div>

      <div
        className={cn(
          "mt-12 flex flex-col items-center justify-center transition-opacity",
          !settings.shouldShowTimer && "opacity-0",
        )}
      >
        <Timer
          className="text-center text-2xl font-bold"
          isRunning={progression.isPlaying}
        />
        <AnimatePresence>
          {!!progression.hasWon &&
            progression.endTime !== null &&
            progression.endTime !== 0 &&
            progression.startTime !== null &&
            progression.startTime !== 0 && (
              <motion.span
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                className="overflow-clip text-zinc-500"
              >
                Average reaction time{" "}
                <span className="font-bold text-zinc-200">
                  {(
                    (progression.endTime - progression.startTime) /
                    progression.atoms.length /
                    1000
                  ).toFixed(2)}
                  s
                </span>
              </motion.span>
            )}
        </AnimatePresence>

        <ReactionTime
          key={progression.currentIndex}
          time={progression.reactionTime[progression.currentIndex]?.time ?? 0}
        />
      </div>

      <div className="mx-auto flex max-w-fit flex-wrap justify-center gap-8">
        <div className="flex flex-col items-center gap-2">
          <AnswerContainer />

          {!progression.isPlaying && (
            <Button onClick={handlePlay} variant="outline">
              Play
            </Button>
          )}
        </div>

        {/* ReactionTimeList */}
        <AnimatePresence mode="wait">
          {progression.status === "ended" && (
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "auto" }}
              exit={{ width: 0 }}
            >
              <ReactionTimeList />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* {progression.firstLetterTime.map(r => (
        <div>{r.time}</div>
      ))} */}

      {/* Minimap */}
      {!!settings.shouldShowMinimap && (
        <div className="fixed bottom-4 right-4 rounded-lg bg-gradient-to-br  from-zinc-400/10 to-transparent p-4 ">
          <div className="mx-auto flex max-w-md flex-wrap justify-center gap-1">
            {Object.entries(COLORS.family).map(([name, color]) => (
              <span
                key={name}
                className="flex items-center rounded-full border border-solid px-1 py-0.5 text-[8px]"
                style={{
                  backgroundColor: `${color}66`,
                  color,
                  borderColor: color,
                }}
              >
                <AnimatePresence mode="wait">
                  {progression.atoms
                    .filter(atom => atom.family.name === name)
                    .every(atom =>
                      progression.hasAtomPassed(atom.atomicNumber),
                    ) && (
                    <motion.span
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: "auto", opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                    >
                      <CheckIcon className="text-green-500" />
                    </motion.span>
                  )}
                </AnimatePresence>
                {name}
              </span>
            ))}
          </div>
          <PeriodicTable
            className="gap-0.5"
            atoms={atoms}
            renderAtom={atom => (
              <motion.div
                className="flow-root cursor-default select-none rounded border border-solid p-0.5 backdrop-blur-xl transition-all hover:scale-125 active:scale-95"
                animate={{
                  transition: { duration: 1 },
                  // backgroundColor progression.atoms
                  //   .slice(
                  //     0,
                  //     progression.correctAnswers + progression.skippedAnswers,
                  //   )
                  //   .some(a => a.atomicNumber === atom.atomicNumber)
                  //   ? COLORS.block[atom.block]
                  //   : "transparent",

                  background: progression.hasAtomPassed(atom.atomicNumber)
                    ? `${COLORS.family[atom.family.name]}66`
                    : "#171717",
                  borderColor: progression.hasAtomPassed(atom.atomicNumber)
                    ? COLORS.family[atom.family.name]
                    : "#333333",
                  color: progression.hasAtomPassed(atom.atomicNumber)
                    ? COLORS.family[atom.family.name]
                    : "#333",
                  borderRadius: 4,
                  boxShadow: `0px 0px 8.2px 0px ${
                    progression.hasAtomPassed(atom.atomicNumber)
                      ? COLORS.family[atom.family.name]
                      : "#333333"
                  }55`,
                }}
              >
                <span className="absolute text-[5px] leading-[0.5]">
                  {atom.atomicNumber}
                </span>
                <span className="block text-center">{atom.symbol}</span>
              </motion.div>
            )}
          />
        </div>
      )}
    </div>
  );
};

export default GameHandler;
