interface ListProps<T> {
  of: T[] | readonly T[];
  children: (item: T) => React.ReactNode;
  getKey?: (item: T, index: number, array: T[]) => React.Key;
}

const List = <TProps,>({ of, children }: ListProps<TProps>) => {
  return <>{of.map(children)}</>;
};

export default List;
