import useAchievements from "../hooks/useAchievements";
import { useEffect } from "react";
import useModes from "~/hooks/useModes";
import { useProgression } from "~/stores/progression";
import { useSettings } from "~/stores/settings";

const Retardation: React.FC = () => {
  const achievements = useAchievements();

  const progression = useProgression();
  const settings = useSettings();
  const { guess, answerType, collection } = useModes();

  useEffect(() => {
    if (settings.shouldAutoSend && progression.incorrectAnswers === 1) {
      if (!achievements.isAlreadyUnlocked("Retardation")) {
        achievements.newAchievement("Retardation");
      }
    }
  }, [achievements, progression.incorrectAnswers, settings.shouldAutoSend]);

  return null;
};

export default Retardation;
