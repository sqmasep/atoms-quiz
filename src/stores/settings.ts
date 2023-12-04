import { proxy } from "valtio";

export const settingsStore = proxy({
  shouldShowTimer: true,
  shouldSkipAnimations: false,
  hasSound: true,
  shouldShowMinimap: true,

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

export const useSettings = () => settingsStore;
