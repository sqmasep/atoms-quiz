import { CommitIcon, EnterFullScreenIcon } from "@radix-ui/react-icons";
import type { NonEmptyTuple } from "~/utils/types";

export const COLLECTION_OPTIONS = [
  {
    value: "all",
    label: "100% (118)",
    icon: <CommitIcon />,
  },
  {
    value: "extended",
    label: "Extended (183)",
    isDisabled: true,
    icon: <EnterFullScreenIcon />,
  },

  {
    value: "s-block",
    label: "S-Block (14)",
    icon: <CommitIcon />,
  },
  {
    value: "f-block",
    label: "F-Block (27)",
    icon: <CommitIcon />,
  },
  {
    value: "d-block",
    label: "D-Block (41)",
    icon: <CommitIcon />,
  },
  {
    value: "p-block",
    label: "P-Block (36)",
    icon: <CommitIcon />,
  },
  // {
  //   value: "alkali-metals",
  //   label: "Alkali Metals",
  //   icon: <CommitIcon />,
  // },
  // {
  //   value: "alkaline-earth-metals",
  //   label: "Alkaline Earth Metals",
  //   icon: <CommitIcon />,
  // },
  // {
  //   value: "transition-metals",
  //   label: "Transition Metals",
  //   icon: <CommitIcon />,
  // },
  // {
  //   value: "post-transition-metals",
  //   label: "Post Transition Metals",
  //   icon: <CommitIcon />,
  // },
  // {
  //   value: "metalloids",
  //   label: "Metalloids",
  //   icon: <CommitIcon />,
  // },
  // {
  //   value: "nonmetals",
  //   label: "Nonmetals",
  //   icon: <CommitIcon />,
  // },
  // {
  //   value: "halogens",
  //   label: "Halogens",
  //   icon: <CommitIcon />,
  // },
  // {
  //   value: "noble-gases",
  //   label: "Noble Gases",
  //   icon: <CommitIcon />,
  // },
  // {
  //   value: "lanthanides",
  //   label: "Lanthanides",
  //   icon: <CommitIcon />,
  // },
  // {
  //   value: "actinides",
  //   label: "Actinides",
  //   icon: <CommitIcon />,
  // },
] as const satisfies NonEmptyTuple<{
  value: string;
  label: string;
  isDisabled?: boolean;
  icon: React.ReactNode;
}>;

export type CollectionOptionValue =
  (typeof COLLECTION_OPTIONS)[number]["value"];
