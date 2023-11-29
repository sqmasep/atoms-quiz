import Atom from "~/components/Atom";
import ChoiceCard from "./ChoiceCard";

interface ChoiceCardsProps {}

const ChoiceCards: React.FC<
  ChoiceCardsProps &
    Omit<React.ComponentPropsWithoutRef<"div">, keyof ChoiceCardsProps>
> = ({ ...props }) => {
  return (
    <div {...props} className="grid grid-cols-4 gap-4">
      <ChoiceCard value="3" />
      <ChoiceCard value="4" />
      <ChoiceCard value="11" />
      <ChoiceCard value="8" />
    </div>
  );
};

export default ChoiceCards;
