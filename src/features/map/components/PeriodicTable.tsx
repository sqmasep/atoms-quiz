import List from "~/components/List";
import { cn } from "~/lib/utils";
import type { AtomType, AtomsType } from "~/lib/validation/atomSchema";

interface PeriodicTableProps {
  renderAtom: (atom: AtomType) => React.ReactNode;
  atoms: AtomsType | Readonly<AtomsType>;
}

const createArray = (from: number, to: number) =>
  Array.from({ length: to - from + 1 }, (_, i) => from + i);

const PeriodicTable: React.FC<
  PeriodicTableProps &
    Omit<React.ComponentPropsWithoutRef<"div">, keyof PeriodicTableProps>
> = ({ renderAtom, atoms, ...props }) => {
  return (
    <div {...props} className={cn("grid grid-cols-18", props.className)}>
      <div>{renderAtom(atoms[0])}</div>
      <div className="col-span-16" />
      <div>{renderAtom(atoms[1])}</div>

      <div>{renderAtom(atoms[2])}</div>
      <div>{renderAtom(atoms[3])}</div>
      <div className="col-span-10" />

      <List of={createArray(4, 9)}>
        {value => <div key={value}>{renderAtom(atoms[value])}</div>}
      </List>

      <div>{renderAtom(atoms[10])}</div>
      <div>{renderAtom(atoms[11])}</div>
      <div className="col-span-10" />
      <List of={createArray(12, 56)}>
        {value => <div key={value}>{renderAtom(atoms[value])}</div>}
      </List>

      <List of={createArray(71, 88)}>
        {value => <div key={value}>{renderAtom(atoms[value])}</div>}
      </List>

      <List of={createArray(103, 117)}>
        {value => <div key={value}>{renderAtom(atoms[value])}</div>}
      </List>

      <div className="col-span-18 h-6" />

      <div className="col-span-3" />
      <List of={createArray(57, 70)}>
        {value => <div key={value}>{renderAtom(atoms[value])}</div>}
      </List>
      <div className="col-span-1" />

      <div className="col-span-3" />
      <List of={createArray(89, 102)}>
        {value => <div key={value}>{renderAtom(atoms[value])}</div>}
      </List>
      <div className="col-span-1" />
    </div>
  );
};

export default PeriodicTable;
