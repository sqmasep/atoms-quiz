import { proxy, useSnapshot } from "valtio";
import type { AtomType, AtomsType } from "~/lib/validation/atomSchema";

export const progressionStore = proxy({
  atoms: [] as AtomsType,
  currentAtom: null as AtomType | null,

  startTime: null as number | null,
  endTime: null as number | null,
  get hasStarted() {
    return this.startTime !== null;
  },
  get hasEnded() {
    return this.endTime !== null;
  },
  get isPlaying() {
    return this.hasStarted && !this.hasEnded;
  },

  start: () => {
    progressionStore.startTime = Date.now();
  },

  end: () => {
    progressionStore.endTime = Date.now();
  },

  correctAnswers: 1,
  incorrectAnswers: 0,
  skippedAnswers: 0,

  setAtoms: (atoms: AtomsType) => {
    progressionStore.atoms = atoms;
  },

  setCurrentAtom: (atom: AtomType) => {
    progressionStore.currentAtom = atom;
  },

  hasAtomPassed: (atomicNumber: number) => {
    const atomIndex = progressionStore.atoms
      .map(atom => atom.atomicNumber)
      .indexOf(atomicNumber);

    return (
      atomIndex <
      progressionStore.correctAnswers + progressionStore.skippedAnswers
    );
  },

  incrementCorrect: () => {
    if (
      progressionStore.correctAnswers + progressionStore.skippedAnswers <
      progressionStore.atoms.length
    ) {
      progressionStore.correctAnswers++;
    }
  },

  incrementIncorrect: () => progressionStore.incorrectAnswers++,

  skip: () => {
    if (
      progressionStore.correctAnswers + progressionStore.skippedAnswers <
      progressionStore.atoms.length
    ) {
      progressionStore.skippedAnswers++;
    }
    progressionStore.nextQuestion();
  },

  // WARN just switched to getter and `this`, see if it breaks in the future or not
  // it should not, since now it's working as a computed property
  get hasWon() {
    return this.correctAnswers + this.skippedAnswers === this.atoms.length;
  },

  get getProgressPercentage() {
    return (
      ((this.correctAnswers + this.skippedAnswers) / this.atoms.length) * 100
    );
  },

  nextQuestion: () => {
    if (progressionStore.currentAtom) {
      const currentIndex = progressionStore.atoms
        .map(atom => atom.atomicNumber)
        .indexOf(progressionStore.currentAtom.atomicNumber);

      if (currentIndex < progressionStore.atoms.length - 1) {
        progressionStore.currentAtom = progressionStore.atoms[currentIndex + 1];
      } else {
        progressionStore.end();
      }
    }
  },

  reset: () => {
    progressionStore.startTime = null;
    progressionStore.endTime = null;
    progressionStore.currentAtom = null;
    progressionStore.atoms = [];
    progressionStore.correctAnswers = 0;
    progressionStore.incorrectAnswers = 0;
    progressionStore.skippedAnswers = 0;
  },
});

export const useProgression = () => useSnapshot(progressionStore);
