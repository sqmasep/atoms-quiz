import { proxy, useSnapshot } from "valtio";
import type { AtomsType } from "~/lib/validation/atomSchema";

const defaultAtomsStore = proxy({
  atoms: [] as AtomsType,
  setAtoms: (atoms: AtomsType) => {
    defaultAtomsStore.atoms = atoms;
  },
});

export const useDefaultAtoms = () => useSnapshot(defaultAtomsStore);
