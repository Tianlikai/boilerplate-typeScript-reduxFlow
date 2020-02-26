export interface GenericListProps<T> {
  items: [];
  itemRender: (item: T) => React.ReactNode;
  className?: string;
}
