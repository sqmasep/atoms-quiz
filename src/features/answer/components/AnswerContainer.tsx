"use client";

import useModes from "~/hooks/useModes";
import WriteAnswerInput from "./WriteAnswerInput";
import ChoiceCards from "./ChoiceCards";

interface AnswerContainerProps {}

const AnswerContainer: React.FC<
  AnswerContainerProps &
    Omit<React.ComponentPropsWithoutRef<"div">, keyof AnswerContainerProps>
> = ({ ...props }) => {
  const { answerType } = useModes();

  return (
    <div {...props} className="mx-auto mt-48 max-w-3xl">
      {answerType === "write-answer" && <WriteAnswerInput />}
      {answerType === "options" && <ChoiceCards />}
    </div>
  );
};

export default AnswerContainer;
