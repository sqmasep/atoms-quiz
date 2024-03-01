import useAchievements from "../hooks/useAchievements";
import AFutureSpeedrunner from "./AFutureSpeedrunner";
import AMinimalist from "./AMinimalist";
import Retardation from "./Retardation";
import TimeAchievements from "./TimeAchievements";

const AchievementsHandler: React.FC = () => {
  const { isAlreadyUnlocked } = useAchievements();
  return (
    <>
      {!isAlreadyUnlocked("A future speedrunner") && <AFutureSpeedrunner />}
      {!isAlreadyUnlocked("A minimalist") && <AMinimalist />}
      {!isAlreadyUnlocked("Bro is insane") && <TimeAchievements />}
      {!isAlreadyUnlocked("Retardation") && <Retardation />}
    </>
  );
};

export default AchievementsHandler;
