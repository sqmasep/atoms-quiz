"use client";

import { useEffect } from "react";
import { Progress } from "~/components/ui/progress";
import AnswerOptionsSelect from "~/features/modes/components/AnswerOptionsSelect";
import CollectionOptionsSelect from "~/features/modes/components/CollectionOptionsSelect";
import GuessOptionsSelect from "~/features/modes/components/GuessOptionsSelect";
import SortingOptionsSelect from "~/features/modes/components/SortingOptionsSelect";
import SettingsDropdown from "~/features/settings/components/SettingsDropdown";
import useModes from "~/hooks/useModes";
import { useProgression } from "~/stores/progression";

const Navbar: React.FC = () => {
  // TODO use `useModes` or something for the selected options
  const { answerType, collection, guess, sort } = useModes();
  const progression = useProgression();

  useEffect(() => {
    progression.reset();
  }, [answerType, collection, guess, sort]);

  return (
    <>
      <Progress value={progression.getProgressPercentage} />
      {progression.hasWon ? "you won!" : ""}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <AnswerOptionsSelect />
          <SortingOptionsSelect />
          <GuessOptionsSelect />
          <CollectionOptionsSelect />
        </div>

        <SettingsDropdown />
      </div>
    </>
  );
};

export default Navbar;
