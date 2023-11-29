"use client";

import { useEffect, useState } from "react";
import AtomsCounter from "~/features/stats/components/AtomsCounter";
import useModes from "~/hooks/useModes";
import type { AtomsType } from "~/lib/validation/atomSchema";
import type { WithChildren } from "~/utils/types";

interface GameHandlerProps extends WithChildren {
  atoms: AtomsType;
}

const GameHandler: React.FC<
  GameHandlerProps &
    Omit<React.ComponentPropsWithoutRef<"div">, keyof GameHandlerProps>
> = ({ children, atoms, ...props }) => {
  const { answerType, collection, guess, setMode } = useModes();

  // TODO use
  const sortedAtoms = atoms;

  const [currentAtom, setCurrentAtom] = useState(sortedAtoms[0]);
  const [stats, setStats] = useState({
    correct: 0,
    incorrect: 0,
  });

  function giveAGuess(answer: string) {}

  function nextQuestion() {
    const nextAtom = sortedAtoms[sortedAtoms.indexOf(currentAtom) + 1];
    setCurrentAtom(nextAtom);
  }

  function resetGame() {
    setStats(prev => ({ ...prev, correct: 0, incorrect: 0 }));
  }

  useEffect(() => {}, [answerType, collection, guess]);

  return (
    <div {...props}>
      <AtomsCounter currentCount={} />
    </div>
  );
};

export default GameHandler;
