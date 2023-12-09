import type { ElementRef } from "react";
import { useRef } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

interface WriteAnswerInputProps {
  giveAGuess: (guess: string) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const WriteAnswerInput: React.FC<
  WriteAnswerInputProps &
    Omit<React.ComponentPropsWithoutRef<"form">, keyof WriteAnswerInputProps>
> = ({ giveAGuess, onChange, ...props }) => {
  const inputRef = useRef<ElementRef<"input">>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!inputRef.current) return;

    giveAGuess(inputRef.current.value);

    inputRef.current.value = "";
    inputRef.current.focus();
  }

  return (
    <form {...props} onSubmit={handleSubmit} className="flex gap-1">
      <Input ref={inputRef} onChange={onChange} className="mx-auto font-mono" />
      <Button type="submit">send</Button>
    </form>
  );
};

export default WriteAnswerInput;
