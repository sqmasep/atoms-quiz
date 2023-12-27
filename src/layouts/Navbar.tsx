import { IdCardIcon } from "@radix-ui/react-icons";
import { useEffect } from "react";
import { Button } from "~/components/ui/button";
import { Progress } from "~/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import AnswerOptionsSelect from "~/features/modes/components/AnswerOptionsSelect";
import CollectionOptionsSelect from "~/features/modes/components/CollectionOptionsSelect";
import GuessOptionsSelect from "~/features/modes/components/GuessOptionsSelect";
import SortingOptionsSelect from "~/features/modes/components/SortingOptionsSelect";
import SettingsDropdown from "~/features/settings/components/SettingsDropdown";
import useModes from "~/hooks/useModes";
import { useProgression } from "~/stores/progression";

const Navbar: React.FC = () => {
  const { answerType, collection, guess, sort } = useModes();
  const progression = useProgression();

  useEffect(() => {
    progression.reset();
  }, [answerType, collection, guess, sort]);

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1">
        <AnswerOptionsSelect />
        <SortingOptionsSelect />
        <GuessOptionsSelect />
        <CollectionOptionsSelect />
      </div>

      <div className="flex items-center gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" variant="outline">
                <IdCardIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Achievements</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <SettingsDropdown />
      </div>
    </div>
  );
};

export default Navbar;
