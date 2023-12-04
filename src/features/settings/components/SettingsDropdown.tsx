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
import { useSettings } from "~/stores/settings";

// interface SettingsDropdownProps {}

const SettingsDropdown: React.FC<
  React.ComponentPropsWithoutRef<typeof DropdownMenu>
> = ({ ...props }) => {
  const settings = useSettings();

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
        <DropdownMenuCheckboxItem
          checked={settings.shouldShowTimer}
          onCheckedChange={() => settings.toggleTimer()}
        >
          <span className="flex grow items-center justify-between gap-6">
            Show timer
            <LapTimerIcon />
          </span>
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={settings.shouldSkipAnimations}
          onCheckedChange={() => settings.toggleAnimations()}
        >
          <span className="flex grow items-center justify-between gap-6">
            Skip animations
            <MagicWandIcon />
          </span>
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={settings.hasSound}
          onCheckedChange={() => settings.toggleSound()}
        >
          <span className="flex grow items-center justify-between gap-6">
            Enable sound
            <SpeakerLoudIcon />
          </span>
        </DropdownMenuCheckboxItem>

        <DropdownMenuCheckboxItem
          checked={settings.shouldShowMinimap}
          onCheckedChange={() => settings.toggleMinimap()}
        >
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
