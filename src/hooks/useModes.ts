import type { PicklistOptions } from "valibot";
import { parse, picklist } from "valibot";
import type { SortingOptionValue } from "~/features/modes/components/SortingOptionsSelect";
import { SORTING_OPTIONS } from "~/features/modes/components/SortingOptionsSelect";
import useQueryParams from "./useQueryParams";
import type { AnswerTypeOptionValue } from "~/features/modes/data/answerTypeOptions";
import { ANSWER_TYPE_OPTIONS } from "~/features/modes/data/answerTypeOptions";
import type { GuessOptionValue } from "~/features/modes/data/guessOptions";
import { GUESS_OPTIONS } from "~/features/modes/data/guessOptions";
import type { CollectionOptionValue } from "~/features/modes/data/collectionOptions";
import { COLLECTION_OPTIONS } from "~/features/modes/data/collectionOptions";

const answerTypeSchema = picklist(
  ANSWER_TYPE_OPTIONS.map(
    option => option.value,
  ) as PicklistOptions<AnswerTypeOptionValue>,
);

const guessSchema = picklist(
  GUESS_OPTIONS.map(
    option => option.value,
  ) as PicklistOptions<GuessOptionValue>,
);

const sortSchema = picklist(
  SORTING_OPTIONS.map(
    option => option.value,
  ) as PicklistOptions<SortingOptionValue>,
);

const collectionSchema = picklist(
  COLLECTION_OPTIONS.map(
    option => option.value,
  ) as PicklistOptions<CollectionOptionValue>,
);

const MODES = {
  answerType: "answer-type",
  guess: "guess",
  collection: "collection",
  sort: "sort",
} as const;

export type Modes = typeof MODES;

const useModes = () => {
  const { queryParams, setQueryParams } = useQueryParams<Modes[keyof Modes]>();

  const answerType = parse(
    answerTypeSchema,
    queryParams.get("answer-type") ?? ANSWER_TYPE_OPTIONS[0].value,
  );

  const guess = parse(
    guessSchema,
    queryParams.get("guess") ?? GUESS_OPTIONS[0].value,
  );

  const collection = parse(
    collectionSchema,
    queryParams.get("collection") ?? COLLECTION_OPTIONS[0].value,
  );

  return { answerType, guess, collection, setMode: setQueryParams };
};

export default useModes;
