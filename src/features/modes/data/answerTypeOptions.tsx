import { KeyboardIcon, ListBulletIcon } from "@radix-ui/react-icons";
import type { NonEmptyTuple } from "~/utils/types";

export const ANSWER_TYPE_OPTIONS = [
  {
    value: "options",
    label: "Multiple choice",
    isDisabled: true,
    icon: <ListBulletIcon />,
  },
  {
    value: "write-answer",
    label: "Write answer",
    icon: <KeyboardIcon />,
  },
  {
    value: "map",
    label: "Map",
    icon: <KeyboardIcon />,
  },
] as const satisfies NonEmptyTuple<{
  value: string;
  label: string;
  isDisabled?: boolean;
  icon: React.ReactNode;
}>;

export type AnswerTypeOptionValue =
  (typeof ANSWER_TYPE_OPTIONS)[number]["value"];
