import { cn } from "~/lib/utils";
import type { AtomType, AtomsType } from "~/lib/validation/atomSchema";

interface PeriodicTableProps {
  renderAtom: (atom: AtomType) => React.ReactNode;
  atoms: AtomsType;
}

const PeriodicTable: React.FC<
  PeriodicTableProps &
    Omit<React.ComponentPropsWithoutRef<"div">, keyof PeriodicTableProps>
> = ({ renderAtom, atoms, ...props }) => {
  return (
    <div {...props} className={cn("grid-cols-18 grid", props.className)}>
      <div>{renderAtom(atoms[0])}</div>
      <div className="col-span-16" />
      <div>{renderAtom(atoms[1])}</div>

      <div>{renderAtom(atoms[2])}</div>
      <div>{renderAtom(atoms[3])}</div>
      <div className="col-span-10" />
      <div>{renderAtom(atoms[4])}</div>
      <div>{renderAtom(atoms[5])}</div>
      <div>{renderAtom(atoms[6])}</div>
      <div>{renderAtom(atoms[7])}</div>
      <div>{renderAtom(atoms[8])}</div>
      <div>{renderAtom(atoms[9])}</div>

      <div>{renderAtom(atoms[10])}</div>
      <div>{renderAtom(atoms[11])}</div>
      <div className="col-span-10" />
      <div>{renderAtom(atoms[12])}</div>
      <div>{renderAtom(atoms[13])}</div>
      <div>{renderAtom(atoms[14])}</div>
      <div>{renderAtom(atoms[15])}</div>
      <div>{renderAtom(atoms[16])}</div>
      <div>{renderAtom(atoms[17])}</div>

      <div>{renderAtom(atoms[18])}</div>
      <div>{renderAtom(atoms[19])}</div>
      <div>{renderAtom(atoms[20])}</div>
      <div>{renderAtom(atoms[21])}</div>
      <div>{renderAtom(atoms[22])}</div>
      <div>{renderAtom(atoms[23])}</div>
      <div>{renderAtom(atoms[24])}</div>
      <div>{renderAtom(atoms[25])}</div>
      <div>{renderAtom(atoms[26])}</div>
      <div>{renderAtom(atoms[27])}</div>
      <div>{renderAtom(atoms[28])}</div>
      <div>{renderAtom(atoms[29])}</div>
      <div>{renderAtom(atoms[30])}</div>
    </div>
  );
};

export default PeriodicTable;
