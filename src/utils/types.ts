import type { Variants } from "framer-motion";
import type { LiteralUnion as TypeFestLiteralUnion } from "type-fest";

export type NonEmptyTuple<TElement> = readonly [TElement, ...TElement[]];
export type LiteralUnion<TString> = TypeFestLiteralUnion<TString, string>;
export type Nullish<T> = T | null | undefined;

export type { Except as StrictExcept } from "type-fest";
export type Except<
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  TObj extends Record<PropertyKey, any>,
  TKey extends LiteralUnion<keyof TObj>,
> = Omit<TObj, TKey>;

export interface WithChildren {
  children: React.ReactNode;
}

export type AnimationRelation = Record<"parent" | "child", Variants>;

// type F = Extract<{ epic: string; jar: number } | "Hello", string>;
// type G = Extract<{ epic: string; jar: number } | "Hello", AnyRecord>;
// //   ^?

// type AnyRecord = Record<PropertyKey, any>;

// /* eslint-disable @typescript-eslint/no-explicit-any */
// export type PropsOverrides<
//   TElement extends React.ElementType<any>,
//   TExcludeProps extends
//     | LiteralUnion<keyof TElementProps>
//     | AnyRecord
//     | undefined = undefined,
//   TElementProps extends AnyRecord = React.ComponentPropsWithoutRef<TElement>,
//   TObjProps = TExcludeProps extends undefined
//     ? TElementProps
//     : TExcludeProps extends AnyRecord
//       ? Extract<TExcludeProps, AnyRecord>
//       : TElementProps,
//   TStringProps extends PropertyKey = TExcludeProps extends undefined
//     ? keyof TElementProps
//     : Extract<TExcludeProps, string>,
// > = Omit<TElementProps, TStringProps | keyof TObjProps> &
//   (TExcludeProps extends undefined
//     ? // if no properties to omit are declared, return all properties
//       TElementProps
//     : // if at least one property is declared,
//       TExcludeProps extends AnyRecord
//       ? // overload for object properties
//         TExcludeProps
//       : TStringProps extends keyof TElementProps
//         ? Extract<TElementProps, TStringProps>
//         : unknown);

// type Q = Omit<{ epic: string; jar: number }, "epic"> & unknown;
// //   ^?

// /* eslint-enable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-unused-vars */

// type Z = PropsOverrides<"a">;
// //   ^?
// const z: Z = {};

// const a: PropsOverrides<"a", "href"> = {};
// const b: PropsOverrides<"a", { jar: string }> = {};
// const c: PropsOverrides<"a", "href" | { jar: string }> = {};
// const d: PropsOverrides<"a", "href" | { href: number }> = { href: "" };
// const e: PropsOverrides<"a"> = {};
