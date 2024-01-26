import { proxy, useSnapshot } from "valtio";
import type { AtomType, AtomsType } from "~/lib/validation/atomSchema";

type ProgressionStatus = "reset" | "playing" | "ended" | "post-match";

// That's a timestamp btw
let lastReactionTime = 0;

export const progressionStore = proxy({
  atoms: [] as AtomsType,
  currentAtom: null as AtomType | null,

  startTime: null as number | null,
  endTime: null as number | null,
  status: "reset" as ProgressionStatus,

  setStatus: (status: ProgressionStatus) => {
    progressionStore.status = status;
  },

  get hasStarted() {
    return this.startTime !== null;
  },
  get hasEnded() {
    return this.endTime !== null;
  },
  get isPlaying() {
    return this.status === "playing";
  },

  get currentIndex() {
    return this.correctAnswers + this.skippedAnswers - 1;
  },

  start: () => {
    const now = Date.now();
    progressionStore.startTime = now;
    lastReactionTime = now;
    progressionStore.setStatus("playing");
  },

  end: () => {
    progressionStore.endTime = Date.now();
    progressionStore.status = "ended";
  },

  correctAnswers: 1,
  incorrectAnswers: 0,
  skippedAnswers: 0,

  reactionTime: [] as {
    time: number;
    isSkipped?: boolean;
  }[],

  firstLetterTime: [] as {
    time: number;
  }[],

  addFirstLetterTime: () => {
    progressionStore.firstLetterTime.push({
      time: Date.now() - lastReactionTime,
    });
  },

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
      progressionStore.nextQuestion({ isSkipped: true });
    }
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

  nextQuestion: (config?: { isSkipped?: boolean }) => {
    if (!progressionStore.currentAtom) return;

    const currentIndex = progressionStore.atoms
      .map(atom => atom.atomicNumber)
      .indexOf(progressionStore.currentAtom.atomicNumber);

    if (currentIndex < progressionStore.atoms.length - 1) {
      progressionStore.currentAtom = progressionStore.atoms[currentIndex + 1];
    } else {
      progressionStore.end();
    }

    progressionStore.reactionTime.push({
      time: Date.now() - lastReactionTime,
      isSkipped: config?.isSkipped,
    });
    lastReactionTime = Date.now();
  },

  reset: () => {
    progressionStore.startTime = null;
    progressionStore.endTime = null;
    progressionStore.currentAtom = null;
    progressionStore.currentIndex = -1;
    progressionStore.correctAnswers = 0;
    progressionStore.incorrectAnswers = 0;
    progressionStore.skippedAnswers = 0;
    progressionStore.reactionTime = [];
    progressionStore.firstLetterTime = [];
    progressionStore.status = "reset";
  },
});

export const useProgression = () => useSnapshot(progressionStore);
