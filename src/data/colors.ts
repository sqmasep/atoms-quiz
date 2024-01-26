import type { AtomType } from "~/lib/validation/atomSchema";

type Color = `#${string}`;
type BlockMode = Record<AtomType["block"], Color>;
type PeriodMode = Record<AtomType["period"], Color>;
type GroupMode = Record<AtomType["group"], Color>;
type FamilyMode = Record<AtomType["family"]["name"], Color>;

interface Modes {
  block: BlockMode;
  period: PeriodMode;
  group: GroupMode;
  family: FamilyMode;
}

export const COLORS = {
  block: {
    s: "#ff0000",
    f: "#ff8000",
    d: "#ffff00",
    p: "#00ff00",
  },
  group: {
    1: "#ff0000",
    2: "#ff8000",
    3: "#ffff00",
    4: "#00ff00",
    5: "#00ffff",
    6: "#0000ff",
    7: "#ff00ff",
    8: "#ffffff",
    9: "#000000",
    10: "#808080",
    11: "#800000",
    12: "#808000",
    13: "#008000",
    14: "#008080",
    15: "#000080",
    16: "#800080",
    17: "#c0c0c0",
    18: "#808080",
  },
  period: {
    1: "#ff0000",
    2: "#ff8000",
    3: "#ffff00",
    4: "#00ff00",
    5: "#00ffff",
    6: "#0000ff",
    7: "#ff00ff",
  },
  family: {
    "Non-metal": "#5DFEFE",
    "Post-transition metal": "#ffffff",
    "Transition metal": "#959DEB",
    Metalloid: "#E39471",
    "Noble gas": "#6FFF7D",
    "Alkali metal": "#E0BF8D",
    "Alkaline earth metal": "#5B8DA3",
    Lanthanide: "#CBC05E",
    Actinide: "#A5E764",
    Halogen: "#999999",
  },
} as const satisfies Modes;
