import { proxy, useSnapshot } from "valtio";
import type { AtomType, AtomsType } from "~/lib/validation/atomSchema";

export const progressionStore = proxy({
  atoms: [] as AtomsType,
  currentAtom: null as AtomType | null,

  correctAnswers: 0,
  incorrectAnswers: 0,

  setAtoms: (atoms: AtomsType) => {
    progressionStore.atoms = atoms;
  },

  setCurrentAtom: (atom: AtomType) => {
    progressionStore.currentAtom = atom;
  },

  incrementCorrect: () => {
    if (progressionStore.correctAnswers < progressionStore.atoms.length) {
      progressionStore.correctAnswers++;
    }
  },

  incrementIncorrect: () => {
    progressionStore.incorrectAnswers++;
  },

  reset: () => {
    progressionStore.correctAnswers = 0;
    progressionStore.incorrectAnswers = 0;
  },
});

export const useProgression = () => useSnapshot(progressionStore);
