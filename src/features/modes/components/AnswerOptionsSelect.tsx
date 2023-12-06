"use client";

import List from "~/components/List";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "~/components/ui/select";
import useModes from "~/hooks/useModes";
import { ANSWER_TYPE_OPTIONS } from "../data/answerTypeOptions";

const AnswerOptionsSelect: React.FC<
  React.ComponentPropsWithoutRef<typeof Select>
> = ({ ...props }) => {
  const { answerType, setMode } = useModes();

  return (
    <Select
      {...props}
      value={answerType}
      onValueChange={val => {
        setMode({ "answer-type": val });
      }}
    >
      <SelectTrigger className="w-[200px]">
        {ANSWER_TYPE_OPTIONS.find(option => option.value === answerType)?.label}
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Answer type</SelectLabel>
          <List of={ANSWER_TYPE_OPTIONS}>
            {option => (
              <SelectItem key={option.value} value={option.value}>
                <span className="flex items-center gap-3">
                  {option.icon}
                  {option.label}
                </span>
              </SelectItem>
            )}
          </List>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default AnswerOptionsSelect;
