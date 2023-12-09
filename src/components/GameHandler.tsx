"use client";

import { useEffect } from "react";
import AnswerContainer from "~/features/answer/components/AnswerContainer";
import AtomsCounter from "~/features/stats/components/AtomsCounter";
import useModes from "~/hooks/useModes";
import Navbar from "~/layouts/Navbar";
import type { AtomsType } from "~/lib/validation/atomSchema";
import { useProgression } from "~/stores/progression";
import { Button } from "./ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface GameHandlerProps {
  atoms: AtomsType;
}

const GameHandler: React.FC<
  GameHandlerProps &
    Omit<React.ComponentPropsWithoutRef<"div">, keyof GameHandlerProps>
> = ({ atoms, ...props }) => {
  const { answerType, collection, guess, sort } = useModes();

  const progression = useProgression();

  useEffect(() => {
    progression.reset();
    const sortedAtoms = atoms.toSorted((a, b) => {
      if (sort === "random") return Math.random() - 0.5;
      if (sort === "atomic-number") return a.atomicNumber - b.atomicNumber;
      return 0;
    });

    console.log(sortedAtoms);

    progression.setAtoms(sortedAtoms);
    progression.setCurrentAtom(sortedAtoms[0]);
  }, [sort, guess]);

  // function nextQuestion() {
  //   const nextAtom = sortedAtoms[sortedAtoms.indexOf(currentAtom) + 1];
  //   setCurrentAtom(nextAtom);
  // }

  // useEffect(() => {}, [answerType, collection, guess, sort]);

  function handlePlay() {
    progression.reset();
    const sortedAtoms = atoms.toSorted((a, b) => {
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
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => progression.reset()}
                size="icon"
                variant="ghost"
                className="text-neutral-500"
              >
                <ReloadIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Restart</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <AtomsCounter
          currentCount={progression.correctAnswers + progression.skippedAnswers}
          outOf={progression.atoms.length}
          correctCount={progression.correctAnswers}
          incorrectCount={progression.incorrectAnswers}
          skippedCount={progression.skippedAnswers}
        />

        <Button onClick={() => progression.skip()}>Skip</Button>
      </div>
      <AnswerContainer />
      <Button onClick={handlePlay}>play!</Button>
    </div>
  );
};

export default GameHandler;
