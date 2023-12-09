import { proxy, useSnapshot } from "valtio";
import {
  GUESS_OPTIONS,
  type GuessOptionValue,
} from "~/features/modes/data/guessOptions";

export const settingsStore = proxy({
  shouldShowTimer: true,
  shouldSkipAnimations: false,
  hasSound: true,
  shouldShowMinimap: true,
  shouldAutoSend: false,
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
  toggleAutoSend: (force?: boolean) =>
    (settingsStore.shouldAutoSend = force ?? !settingsStore.shouldAutoSend),

  atomView: GUESS_OPTIONS.map(a => a.value),
  toggleAtomView: (value: GuessOptionValue, force?: boolean) => {
    if (force === true) {
      if (!settingsStore.atomView.includes(value))
        settingsStore.atomView.push(value);
      return;
    }

    if (force === false) {
      if (settingsStore.atomView.includes(value)) {
        settingsStore.atomView.splice(settingsStore.atomView.indexOf(value), 1);
        return;
      }
    }

    if (settingsStore.atomView.includes(value)) {
      settingsStore.atomView.splice(settingsStore.atomView.indexOf(value), 1);
    } else {
      settingsStore.atomView.push(value);
    }
  },
});

export const useSettings = () => useSnapshot(settingsStore);
