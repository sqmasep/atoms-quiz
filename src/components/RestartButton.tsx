import { useProgression } from "~/stores/progression";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { ReloadIcon } from "@radix-ui/react-icons";

const RestartButton: React.FC<React.ComponentPropsWithoutRef<"div">> = ({
  ...props
}) => {
  const progression = useProgression();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={() => progression.reset()}
            size="icon"
            variant="ghost"
            className="text-neutral-500"
          >
            <ReloadIcon />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Restart</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default RestartButton;
