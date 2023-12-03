"use client";

import { useEffect } from "react";
import AnswerContainer from "~/features/answer/components/AnswerContainer";
import AtomsCounter from "~/features/stats/components/AtomsCounter";
import useModes from "~/hooks/useModes";
import Navbar from "~/layouts/Navbar";
import type { AtomsType } from "~/lib/validation/atomSchema";
import { useProgression } from "~/stores/progression";

interface GameHandlerProps {
  atoms: AtomsType;
}

const GameHandler: React.FC<
  GameHandlerProps &
    Omit<React.ComponentPropsWithoutRef<"div">, keyof GameHandlerProps>
> = ({ atoms, ...props }) => {
  const { answerType, collection, guess, sort } = useModes();

  // TODO use `sort` mode
  // const sortedAtoms = atoms;

  const progression = useProgression();

  useEffect(() => {
    progression.setAtoms(atoms);
  }, [atoms, progression]);

  // function nextQuestion() {
  //   const nextAtom = sortedAtoms[sortedAtoms.indexOf(currentAtom) + 1];
  //   setCurrentAtom(nextAtom);
  // }

  // TODO probably should update `progression.atoms` when modes change and reset everything
  // useEffect(() => {}, [answerType, collection, guess, sort]);

  return (
    <div {...props}>
      <Navbar />
      <AtomsCounter
        currentCount={progression.correctAnswers}
        outOf={progression.atoms.length}
      />

      <AnswerContainer />
    </div>
  );
};

export default GameHandler;
