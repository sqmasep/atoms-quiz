import type { AtomType } from "~/lib/validation/atomSchema";

interface PeriodicTableProps {
  renderAtom: (atom: AtomType) => React.ReactNode;
}

const PeriodicTable: React.FC<
  PeriodicTableProps &
    Omit<React.ComponentPropsWithoutRef<"div">, keyof PeriodicTableProps>
> = ({ ...props }) => {
  return <div {...props}>TODO PeriodicTable</div>;
};

export default PeriodicTable;
