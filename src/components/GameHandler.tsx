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
import useAchievements from "~/features/achievements/hooks/useAchievements";
import Timer from "~/features/stats/components/Timer";
import { cn } from "~/lib/utils";
import { COLORS } from "~/data/colors";
import { AnimatePresence, motion } from "framer-motion";
import { CheckIcon } from "@radix-ui/react-icons";

interface GameHandlerProps {
  atoms: AtomsType;
}

const GameHandler: React.FC<
  GameHandlerProps &
    Omit<React.ComponentPropsWithoutRef<"div">, keyof GameHandlerProps>
> = ({ atoms, ...props }) => {
  const { answerType, collection, guess, sort } = useModes();

  const progression = useProgression();
  const settings = useSettings();

  useAchievements();

  useEffect(() => {
    progression.reset();
    const sortedAtoms = atoms.toSorted((a, b) => {
      if (sort === "random") return Math.random() - 0.5;
      if (sort === "atomic-number") return a.atomicNumber - b.atomicNumber;
      return 0;
    });

    progression.setAtoms(sortedAtoms);
    progression.setCurrentAtom(sortedAtoms[0]);
  }, [sort, guess]);

  // useEffect(() => {}, [answerType, collection, guess, sort]);

  function handlePlay() {
    progression.reset();
    progression.start();
    settings.toggleChangedSettingsDuringGame(false);

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
      return 0;
    });

    progression.setAtoms(sortedAtoms);
    progression.setCurrentAtom(sortedAtoms[0]);
  }

  return (
    <div {...props}>
      <Navbar />
      <div className="flex justify-center">
        <RestartButton />

        <AtomsCounter
          currentCount={progression.correctAnswers + progression.skippedAnswers}
          outOf={progression.atoms.length}
          correctCount={progression.correctAnswers}
          incorrectCount={progression.incorrectAnswers}
          skippedCount={progression.skippedAnswers}
        />

        <Button onClick={() => progression.skip()}>Skip</Button>
      </div>

      <Timer
        finalTime={
          !!progression.startTime &&
          (progression.endTime
            ? progression.endTime - progression.startTime
            : null)
        }
        isRunning={progression.isPlaying}
      />

      <AnswerContainer />
      <Button onClick={handlePlay}>play!</Button>
      {progression.startTime?.toString()}
      {progression.endTime?.toString()}

      {!!settings.shouldShowMinimap && (
        <div className="fixed bottom-4 right-4 rounded-lg bg-gradient-to-br  from-zinc-400/10 to-transparent p-4 backdrop-blur-2xl">
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
