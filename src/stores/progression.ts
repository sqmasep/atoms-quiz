import { proxy, useSnapshot } from "valtio";
import type { AtomType, AtomsType } from "~/lib/validation/atomSchema";

export const progressionStore = proxy({
  atoms: [] as AtomsType,
  currentAtom: null as AtomType | null,

  correctAnswers: 1,
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

  nextQuestion: () => {
    if (progressionStore.currentAtom) {
      const currentIndex = progressionStore.atoms.indexOf(
        progressionStore.currentAtom,
      );

      if (currentIndex < progressionStore.atoms.length - 1) {
        progressionStore.currentAtom = progressionStore.atoms[currentIndex + 1];
      }
    }
  },

  reset: () => {
    progressionStore.correctAnswers = 0;
    progressionStore.incorrectAnswers = 0;
  },
});

export const useProgression = () => useSnapshot(progressionStore);
