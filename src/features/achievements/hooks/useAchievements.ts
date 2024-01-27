"use client";

import { useCallback } from "react";
import { useToast } from "~/components/ui/use-toast";
import useLocalStorage from "~/hooks/useLocalStorage";
import type { ACHIEVEMENTS } from "../data/achievements";

const useAchievements = () => {
  const { toast } = useToast();

  const [achievements, setAchievements] = useLocalStorage<
    {
      name: string;
      unlockedAt: Date;
    }[]
  >("achievements", []);

  const isAlreadyUnlocked = useCallback(
    (name: keyof typeof ACHIEVEMENTS) => {
      return !!achievements.find(a => a.name === name);
    },
    [achievements],
  );

  const newAchievement = useCallback(
    (name: keyof typeof ACHIEVEMENTS) => {
      toast({
        title: "Achievement unlocked",
        description: name,
      });

      setAchievements(prev => {
        console.log(prev);
        return [
          ...prev,
          {
            name,
            unlockedAt: new Date(Date.now()),
          },
        ];
      });
    },
    [toast, setAchievements],
  );

  return {
    achievements,
    newAchievement,
    isAlreadyUnlocked,
  };
};

export default useAchievements;
