import useAchievements from "../hooks/useAchievements";
import { useEffect } from "react";
import { useSettings } from "~/stores/settings";

const AMinimalist: React.FC = () => {
  const achievements = useAchievements();

  const settings = useSettings();

  useEffect(() => {
    if (!achievements.isAlreadyUnlocked("A minimalist")) {
      if (settings.atomView.length === 1) {
        achievements.newAchievement("A minimalist");
      }
    }
  }, [settings.atomView, achievements]);

  return null;
};

export default AMinimalist;
