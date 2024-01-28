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
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useSettings } from "~/stores/settings";

// interface SettingsDropdownProps {}

const SettingsDropdown: React.FC<
  React.ComponentPropsWithoutRef<typeof DropdownMenu>
> = ({ ...props }) => {
  const settings = useSettings();

  return (
    <DropdownMenu {...props}>
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

        {/* <DropdownMenuCheckboxItem
          checked={settings.shouldSkipAnimations}
          onCheckedChange={() => settings.toggleAnimations()}
        >
          <span className="flex grow items-center justify-between gap-6">
            Skip animations
            <MagicWandIcon />
          </span>
        </DropdownMenuCheckboxItem> */}

        <DropdownMenuCheckboxItem
          checked={settings.hasSound}
          onCheckedChange={() => settings.toggleSound()}
          disabled
        >
          <span className="flex grow items-center justify-between gap-6">
            Enable sound (Coming soon)
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

        <DropdownMenuCheckboxItem
          checked={settings.shouldAutoSend}
          onCheckedChange={() => settings.toggleAutoSend()}
        >
          <span className="flex grow items-center justify-between gap-6">
            Auto send when correct answer
            <LapTimerIcon />
          </span>
        </DropdownMenuCheckboxItem>

        <DropdownMenuSeparator />

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Coloring mode</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup
              value={settings.coloringMode}
              onValueChange={val =>
                // TODO [TS] [COLORING] use a shared type for that
                settings.setColoringMode(val as "block" | "group" | "period")
              }
            >
              <DropdownMenuRadioItem value="block">Block</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="group" disabled>
                Group (Coming soon)
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="period" disabled>
                Period (Coming soon)
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SettingsDropdown;
