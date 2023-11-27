import type { LiteralUnion as TypeFestLiteralUnion } from "type-fest";

export type NonEmptyTuple<TElement> = readonly [TElement, ...TElement[]];

export type LiteralUnion<TString> = TypeFestLiteralUnion<TString, string>;

export type { Except as StrictExcept } from "type-fest";

export type Except<
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  TObj extends Record<PropertyKey, any>,
  TKey extends LiteralUnion<keyof TObj>,
> = Omit<TObj, TKey>;

export interface WithChildren {
  children: React.ReactNode;
}
