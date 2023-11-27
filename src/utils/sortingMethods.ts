const SORTING_METHODS = {
  random: () => Math.random() - 0.5,
  ascending: (a, b) => a - b,
  descending: (a, b) => b - a,
} as const satisfies Record<string, (a: number, b: number) => number>;

export default SORTING_METHODS;
