import { EyeOpenIcon } from "@radix-ui/react-icons";
import List from "~/components/List";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Switch } from "~/components/ui/switch";
import { GUESS_OPTIONS } from "~/features/modes/data/guessOptions";
import useModes from "~/hooks/useModes";
import { cn } from "~/lib/utils";
import { useSettings } from "~/stores/settings";

const AtomViewSettings: React.FC<
  React.ComponentPropsWithoutRef<typeof Popover>
> = ({ ...props }) => {
  const { guess } = useModes();
  const settings = useSettings();

  // i may want to add other options later: that's why i created a const instead of using directly `GUESS_OPTIONS`
  // so i could spread it in another array
  const VIEW_OPTIONS = GUESS_OPTIONS;

  return (
    <Popover {...props}>
      <PopoverTrigger asChild>
        <Button size="icon" variant="ghost">
          <EyeOpenIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <span className="mb-4 block font-bold">Atom view settings</span>

        <div className="flex flex-col gap-2">
          <List of={VIEW_OPTIONS}>
            {({ value, label }) => (
              <Label
                key={value}
                htmlFor={`atom-view-${value}`}
                className={cn(
                  "flex w-full justify-between",
                  value === guess && "cursor-not-allowed text-zinc-600",
                )}
              >
                {label}
                <Switch
                  disabled={value === guess}
                  id={`atom-view-${value}`}
                  checked={settings.atomView.includes(value)}
                  onCheckedChange={() => settings.toggleAtomView(value)}
                />
              </Label>
            )}
          </List>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AtomViewSettings;
