import {
  GearIcon,
  GridIcon,
  LapTimerIcon,
  MagicWandIcon,
  SpeakerLoudIcon,
} from "@radix-ui/react-icons";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

interface SettingsDropdownProps {}

const SettingsDropdown: React.FC<
  SettingsDropdownProps &
    Omit<React.ComponentPropsWithoutRef<"div">, keyof SettingsDropdownProps>
> = ({ ...props }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="outline">
          <GearIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Settings</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem checked>
          <span className="flex grow items-center justify-between gap-6">
            Show timer
            <LapTimerIcon />
          </span>
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem>
          <span className="flex grow items-center justify-between gap-6">
            Skip animations
            <MagicWandIcon />
          </span>
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked>
          <span className="flex grow items-center justify-between gap-6">
            Enable sound
            <SpeakerLoudIcon />
          </span>
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked>
          <span className="flex grow items-center justify-between gap-6">
            Show minimap
            <GridIcon />
          </span>
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SettingsDropdown;
