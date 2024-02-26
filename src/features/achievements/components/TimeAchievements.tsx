import useAchievements from "../hooks/useAchievements";
import { useEffect } from "react";
import useModes from "~/hooks/useModes";
import { useProgression } from "~/stores/progression";

const TimeAchievements: React.FC = () => {
  const achievements = useAchievements();

  const progression = useProgression();
  const { guess, answerType, collection } = useModes();

  useEffect(() => {
    if (
      guess !== "name" ||
      answerType !== "write-answer" ||
      collection !== "all"
    )
      return;
    if (progression.endTime === null || progression.startTime === null) return;

    const timeDiff = progression.endTime - progression.startTime;

    if (!achievements.isAlreadyUnlocked("Gotta git gud")) {
      if (timeDiff < 240 * 1000) {
        achievements.newAchievement("Gotta git gud");
      }
    }

    if (!achievements.isAlreadyUnlocked("Fasting")) {
      // 03:30
      if (timeDiff < 210 * 1000) {
        achievements.newAchievement("Fasting");
      }
    }

    if (!achievements.isAlreadyUnlocked("Concentration")) {
      // 03:00
      if (timeDiff < 180 * 1000) {
        achievements.newAchievement("Concentration");
      }
    }

    if (!achievements.isAlreadyUnlocked("Bro is insane")) {
      // 02:30
      if (timeDiff < 150 * 1000) {
        achievements.newAchievement("Bro is insane");
      }
    }
  }, [progression, guess, answerType, collection, achievements]);

  return null;
};

export default TimeAchievements;
