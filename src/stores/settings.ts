import { proxy, useSnapshot } from "valtio";

export const settingsStore = proxy({
  shouldShowTimer: true,
  shouldSkipAnimations: false,
  hasSound: true,
  shouldShowMinimap: true,
  guessLanguage: "en" as "en" | "fr",

  toggleTimer: (force?: boolean) =>
    (settingsStore.shouldShowTimer = force ?? !settingsStore.shouldShowTimer),
  toggleAnimations: (force?: boolean) =>
    (settingsStore.shouldSkipAnimations =
      force ?? !settingsStore.shouldSkipAnimations),
  toggleSound: (force?: boolean) =>
    (settingsStore.hasSound = force ?? !settingsStore.hasSound),
  toggleMinimap: (force?: boolean) =>
    (settingsStore.shouldShowMinimap =
      force ?? !settingsStore.shouldShowMinimap),
});

export const useSettings = () => useSnapshot(settingsStore);
