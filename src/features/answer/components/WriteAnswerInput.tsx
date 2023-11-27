import { Input } from "~/components/ui/input";

interface WriteAnswerInputProps {}

const WriteAnswerInput: React.FC<
  WriteAnswerInputProps &
    Omit<React.ComponentPropsWithoutRef<"div">, keyof WriteAnswerInputProps>
> = ({ ...props }) => {
  return <Input className="mx-auto w-1/2 font-mono" />;
};

export default WriteAnswerInput;
