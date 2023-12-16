import {
  array,
  boolean,
  fallback,
  getDefaults,
  object,
  picklist,
  safeParse,
} from "valibot";
import { proxy, subscribe, useSnapshot } from "valtio";
import {
  GUESS_OPTIONS,
  type GuessOptionValue,
} from "~/features/modes/data/guessOptions";

const defaultSettings = {
  shouldShowTimer: true,
  shouldSkipAnimations: false,
  hasSound: true,
  shouldShowMinimap: true,
  shouldAutoSend: false,
  guessLanguage: "en" as "en" | "fr",

  atomView: GUESS_OPTIONS.map(a => a.value),

  hasChangedSettingsDuringGame: false,
} as const;

const localStorageSettingsSchema = object({
  shouldShowTimer: fallback(boolean(), defaultSettings.shouldShowTimer),
  shouldSkipAnimations: fallback(
    boolean(),
    defaultSettings.shouldSkipAnimations,
  ),
  hasSound: fallback(boolean(), defaultSettings.hasSound),
  shouldShowMinimap: fallback(boolean(), defaultSettings.shouldShowMinimap),
  shouldAutoSend: fallback(boolean(), defaultSettings.shouldAutoSend),
  guessLanguage: fallback(
    picklist(["en", "fr"]),
    defaultSettings.guessLanguage,
  ),

  atomView: fallback(
    // FIXME don't know if this actually works
    array(picklist(GUESS_OPTIONS.map(a => a.value))),
    defaultSettings.atomView,
  ),

  hasChangedSettingsDuringGame: fallback(
    boolean(),
    defaultSettings.hasChangedSettingsDuringGame,
  ),
});

const parsedStoredSettings = safeParse(
  localStorageSettingsSchema,
  JSON.parse(localStorage.getItem("settings") ?? "{}"),
);

const settings = parsedStoredSettings.success
  ? parsedStoredSettings.output
  : defaultSettings;

// INFO Not the best solution ever, but it works really well
export const settingsStore = proxy({
  ...settings,

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

  // Atom view related properties
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

  // Achievements-related properties
  toggleChangedSettingsDuringGame: (force?: boolean) =>
    (settingsStore.hasChangedSettingsDuringGame =
      force ?? !settingsStore.hasChangedSettingsDuringGame),
});

subscribe(settingsStore, () => {
  localStorage.setItem("settings", JSON.stringify(settingsStore));
});

export const useSettings = () => useSnapshot(settingsStore);
