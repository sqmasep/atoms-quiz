import type { AtomType } from "~/lib/validation/atomSchema";

export const LANGUAGES = {
  en: { label: "English" },
  fr: { label: "Français" },
} satisfies Record<keyof AtomType["name"], { label: string }>;
