"use client";

import {
  LetterCaseCapitalizeIcon,
  ShuffleIcon,
  TokensIcon,
} from "@radix-ui/react-icons";
import { useSearchParams } from "next/navigation";
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
import type { NonEmptyTuple } from "~/utils/types";

export const SORTING_OPTIONS = [
  {
    value: "random",
    label: "Random",
    icon: <ShuffleIcon />,
  },
  {
    value: "alphabetical",
    label: "Alphabetical",
    icon: <LetterCaseCapitalizeIcon />,
  },
  {
    value: "atomic-number",
    label: "Atomic number",
    icon: <TokensIcon />,
  },
] as const satisfies NonEmptyTuple<{
  value: string;
  label: string;
  icon: React.ReactNode;
}>;

export type SortingOptionValue = (typeof SORTING_OPTIONS)[number]["value"];

const SortingOptionsSelect: React.FC<
  Omit<React.ComponentPropsWithoutRef<typeof Select>, "value" | "onValueChange">
> = ({ ...props }) => {
  const { sort, setMode } = useModes();

  return (
    <Select
      {...props}
      value={sort}
      onValueChange={val => {
        setMode({ sort: val });
      }}
    >
      <SelectTrigger className="w-[200px]">
        {SORTING_OPTIONS.find(option => option.value === sort)?.label}
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sorting</SelectLabel>
          <List of={SORTING_OPTIONS}>
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

export default SortingOptionsSelect;
