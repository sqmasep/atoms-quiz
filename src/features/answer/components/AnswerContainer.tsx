"use client";

import useModes from "~/hooks/useModes";
import WriteAnswerInput from "./WriteAnswerInput";
import ChoiceCards from "./ChoiceCards";
import { useProgression } from "~/stores/progression";
import type { AtomType } from "~/lib/validation/atomSchema";
import { useSettings } from "~/stores/settings";
import Atom from "~/components/Atom";
import AtomViewSettings from "~/features/settings/components/AtomViewSettings";
import { COLORS } from "~/data/colors";
import { cn } from "~/lib/utils";
import { escapeSpecialChars, normalizeString } from "~/utils/formatString";
import { Progress } from "~/components/ui/progress";
import { motion } from "framer-motion";
import MapAnswer from "./MapAnswer";

interface AnswerContainerProps {}

const AnswerContainer: React.FC<
  AnswerContainerProps &
    Omit<React.ComponentPropsWithoutRef<"div">, keyof AnswerContainerProps>
> = ({ ...props }) => {
  const { answerType, guess } = useModes();
  const progression = useProgression();
  const settings = useSettings();

  const { currentAtom } = progression;

  function compareAnswer(atom: AtomType, guessString: string) {
    const answers = {
      "atomic-number": atom.atomicNumber,
      block: atom.block,
      symbol: atom.symbol,
      name: settings.guessLanguage === "fr" ? atom.name.fr : atom.name.en,

      // FIXME [GUESS] need to replace `atomicNumber` by the correct value
      period: atom.atomicNumber,
      group: atom.atomicNumber,
    } as const satisfies Record<typeof guess, unknown>;

    const formattedAnswer = normalizeString(answers[guess].toString());
    const formattedGuess = escapeSpecialChars(normalizeString(guessString));

    return formattedAnswer === formattedGuess;
  }

  function giveAGuess(guessValue: string) {
    if (!currentAtom || !guessValue.length || progression.hasWon) return;
    if (compareAnswer(currentAtom, guessValue)) {
      progression.incrementCorrect();
      progression.nextQuestion();
    } else {
      progression.incrementIncorrect();
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!settings.shouldAutoSend || !currentAtom || progression.hasWon) return;

    // TODO add first letter time stat
    // if (!progression.firstLetterTime[progression.currentIndex])
    //   console.log(progression.firstLetterTime);
    // progression.addFirstLetterTime();

    const value = e.target.value;

    if (compareAnswer(currentAtom, value)) {
      progression.incrementCorrect();
      progression.nextQuestion();
      e.target.value = "";
    }
  }

  const shouldShow = (param: (typeof settings.atomView)[number]) =>
    settings.atomView.includes(param);

  const diff = (
    progression.atoms[progression.currentIndex]?.name.en.length /
    (progression.reactionTime[progression.currentIndex]?.time / 1000)
  ).toFixed(2);

  return (
    <div
      {...props}
      className={cn("flex flex-col items-center gap-4", props.className)}
    >
      <AtomViewSettings />
      <motion.div
        animate={{
          backgroundColor: COLORS.block[currentAtom?.block ?? "s"],
          scale: [1, 1.5],
        }}
        transition={{
          backgroundColor: { duration: 1 },
          scale: { duration: 12, repeat: Infinity, repeatType: "mirror" },
        }}
        className="pointer-events-none absolute h-32 w-32 select-none rounded-full blur-[200px]"
      />

      {!Number.isNaN(diff) && (
        <span className="text-xs">
          {diff} <span className="text-zinc-500">chars/s</span>
        </span>
      )}

      <Atom
        className="h-32 w-32"
        atomicNumber={
          shouldShow("atomic-number") ? (
            guess !== "atomic-number" ? (
              currentAtom?.atomicNumber
            ) : (
              "?"
            )
          ) : (
            <div className="pointer-events-none select-none blur">
              {"*".repeat(currentAtom?.atomicNumber.toString().length ?? 2)}
            </div>
          )
        }
        color=""
        animate={
          {
            // background,
          }
        }
        name={
          shouldShow("name") ? (
            guess !== "name" ? (
              currentAtom?.name[settings.guessLanguage]
            ) : (
              "?"
            )
          ) : (
            <div className="pointer-events-none select-none blur">
              {"*".repeat(
                currentAtom?.name[settings.guessLanguage].length ?? 5,
              )}
            </div>
          )
        }
        symbol={
          shouldShow("symbol") ? (
            guess !== "symbol" ? (
              currentAtom?.symbol
            ) : (
              "?"
            )
          ) : (
            <div className="pointer-events-none select-none blur">
              {"*".repeat(currentAtom?.symbol.length ?? 5)}
            </div>
          )
        }
      />

      <div>
        <Progress
          className=" max-w-[150px]"
          value={progression.getProgressPercentage}
        />
        <span className="text-xs text-zinc-500">
          {progression.getProgressPercentage.toFixed(2)}%
        </span>
      </div>

      {answerType === "write-answer" && (
        <WriteAnswerInput onChange={handleChange} giveAGuess={giveAGuess} />
      )}
      {answerType === "options" && <ChoiceCards />}
      {answerType === "map" && <MapAnswer />}
    </div>
  );
};

export default AnswerContainer;
