export const ACHIEVEMENTS = {
  "A future speedrunner": { description: "I want to be fast!", type: "easy" },
  "A minimalist": { description: "No time for complexity", type: "easy" },

  // Time related
  "Gotta git gud": {
    description: "Resolve 118 elements in under 04:00",
    type: "easy",
  },
  Fasting: {
    description: "Resolve 118 elements in under 03:30",
    type: "medium",
  },
  Concentration: {
    description: "Resolve 118 elements in under 03:00",
    type: "hard",
  },
  "Bro is insane": {
    description: "Resolve 118 elements in under 02:30",
    type: "impossible",
  },

  // Misc.
  Retardation: {
    description: "Fail an answer while having auto-send option enabled",
    type: "easy",
  },
} as const satisfies Record<string, Achievement>;

interface Achievement {
  description: string;
  type: "easy" | "medium" | "hard" | "impossible";
}
