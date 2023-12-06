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
import { GUESS_OPTIONS } from "../data/guessOptions";

const GuessOptionsSelect: React.FC<
  Omit<React.ComponentPropsWithoutRef<typeof Select>, "value" | "onValueChange">
> = ({ ...props }) => {
  const { guess, setMode } = useModes();

  return (
    <Select
      {...props}
      value={guess}
      onValueChange={val => {
        setMode({ guess: val });
      }}
    >
      <SelectTrigger className="w-[200px]">
        {GUESS_OPTIONS.find(option => option.value === guess)?.label}
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Guess</SelectLabel>

          <List of={GUESS_OPTIONS}>
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

export default GuessOptionsSelect;
