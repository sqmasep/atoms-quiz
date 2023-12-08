import {
  string,
  object,
  number,
  array,
  boolean,
  minValue,
  maxValue,
  type Output,
  picklist,
  integer,
} from "valibot";

export const atomSchema = object({
  atomicNumber: number([minValue(1)]),
  symbol: string(),
  atomicMass: string(),
  meltingPoint: object({
    kelvin: string(),
    celsius: string(),
    fahrenheit: string(),
  }),
  name: object({
    en: string(),
    fr: string(),
  }),
  phaseAtSTP: picklist(["gas", "liquid", "solid", "plasma"]),
  block: string(),
  discovery: object({
    by: string(),
    country: string(),
    year: number([integer()]),
  }),
  family: object({
    isMetal: boolean(),
    name: string(),
  }),
  group: number([minValue(1), maxValue(18)]),
  period: number([minValue(1), maxValue(7)]),
});
export type AtomType = Output<typeof atomSchema>;

export const atomsSchema = array(atomSchema);
export type AtomsType = Output<typeof atomsSchema>;
