import { tv } from "tailwind-variants";
import type { Nullish } from "~/utils/types";

// INFO React.ReactNode so we can render anything, if we want to mask the atomic number for example
interface AtomProps {
  atomicNumber: Nullish<React.ReactNode | number>;
  symbol: Nullish<React.ReactNode>;
  name: Nullish<React.ReactNode>;
  color: Nullish<string>;
}

// TODO variants & colors
const atom = tv({
  variants: {
    variant: {
      outline: "border-white",
      solid: "",
    },
    color: {
      red: "",
      green: "",
    },
  },

  slots: {
    wrapper:
      "flex flex-col justify-between rounded-lg border-2 border-solid border-white px-4 pb-2.5 pt-4",
    atomicNumber: "leading-3",
    symbol: "text-center font-mono text-[2.5rem] font-bold leading-10",
    name: "text-center font-mono tracking-wider text-opacity-40",
  },
});

const slots = atom();

const Atom: React.FC<
  AtomProps & Omit<React.ComponentPropsWithoutRef<"div">, keyof AtomProps>
> = ({ atomicNumber, name, symbol, className, ...props }) => {
  return (
    <div {...props} className={slots.wrapper({ className })}>
      <span className={slots.atomicNumber()}>{atomicNumber}</span>

      <div className="flex flex-col justify-between gap-2">
        <span className={slots.symbol()}>{symbol}</span>
        <span className={slots.name()}>{name}</span>
      </div>
    </div>
  );
};

export default Atom;
