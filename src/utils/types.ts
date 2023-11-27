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

/* eslint-disable @typescript-eslint/no-explicit-any */
export type PropsOverrides<
  TElement extends React.ElementType<any>,
  TExclude extends
    | LiteralUnion<keyof React.ComponentPropsWithoutRef<TElement>>
    | Record<PropertyKey, any> = never,
> = Omit<
  React.ComponentPropsWithoutRef<TElement>,
  TExclude extends string
    ? TExclude
    : TExclude extends Record<PropertyKey, any>
      ? keyof TExclude
      : never
> &
  TExclude extends string
  ? Omit<
      React.ComponentPropsWithoutRef<TElement>,
      TExclude extends string ? TExclude : never
    >
  : TExclude extends Record<PropertyKey, any>
    ? TExclude
    : never;

// &
//   (TExclude extends string
//     ? { B: string }
//     : TExclude extends Record<PropertyKey, any>
//       ? TExclude
//       : { A: string });
/* eslint-enable @typescript-eslint/no-explicit-any */
