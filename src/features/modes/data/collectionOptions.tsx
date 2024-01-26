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
    icon: <EnterFullScreenIcon />,
  },

  {
    value: "s-block",
    label: "S-Block",
    icon: <CommitIcon />,
  },
  {
    value: "f-block",
    label: "F-Block",
    icon: <CommitIcon />,
  },
  {
    value: "d-block",
    label: "D-Block",
    icon: <CommitIcon />,
  },
  {
    value: "p-block",
    label: "P-Block",
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
  icon: React.ReactNode;
}>;

export type CollectionOptionValue =
  (typeof COLLECTION_OPTIONS)[number]["value"];
