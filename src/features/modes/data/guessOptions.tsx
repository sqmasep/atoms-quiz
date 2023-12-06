import {
  GroupIcon,
  LetterCaseCapitalizeIcon,
  TokensIcon,
} from "@radix-ui/react-icons";
import type { NonEmptyTuple } from "~/utils/types";

export const GUESS_OPTIONS = [
  {
    value: "atomic-number",
    label: "Atomic number",
    icon: <TokensIcon />,
  },
  {
    value: "name",
    label: "Name",
    icon: <LetterCaseCapitalizeIcon />,
  },
  {
    value: "symbol",
    label: "Symbol",
    icon: <LetterCaseCapitalizeIcon />,
  },
  {
    value: "group",
    label: "Group",
    icon: <GroupIcon />,
  },
  {
    value: "period",
    label: "Period",
    icon: <GroupIcon />,
  },
  {
    value: "block",
    label: "Block",
    icon: <GroupIcon />,
  },
] as const satisfies NonEmptyTuple<{
  value: string;
  label: string;
  icon: React.ReactNode;
}>;

export type GuessOptionValue = (typeof GUESS_OPTIONS)[number]["value"];
