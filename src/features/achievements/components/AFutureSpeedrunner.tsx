import useAchievements from "../hooks/useAchievements";
import { useEffect } from "react";
import { useSettings } from "~/stores/settings";
import useModes from "~/hooks/useModes";

const AFutureSpeedrunner: React.FC = () => {
  const achievements = useAchievements();

  const modes = useModes();
  const settings = useSettings();

  useEffect(() => {
    if (achievements.isAlreadyUnlocked("A future speedrunner")) return;

    if (
      modes.guess === "name" &&
      settings.shouldAutoSend &&
      modes.sort === "atomic-number"
    ) {
      achievements.newAchievement("A future speedrunner");
    }
  }, [settings.shouldAutoSend, modes.guess, modes.sort, achievements]);

  return null;
};

export default AFutureSpeedrunner;
