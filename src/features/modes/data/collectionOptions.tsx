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

  // FIXME a very bad idea, need to find a better way to do this
  {
    value: "categories",
    label: "Catégories",
    icon: <CommitIcon />,
  },
] as const satisfies NonEmptyTuple<{
  value: string;
  label: string;
  icon: React.ReactNode;
}>;

export type CollectionOptionValue =
  (typeof COLLECTION_OPTIONS)[number]["value"];
