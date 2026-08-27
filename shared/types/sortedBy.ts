declare const __sortBy: unique symbol;

export type SortOrder = "asc" | "desc";

export interface SortOption<T> {
  key: keyof T;
  order: SortOrder;
}

export type SortedBy<T, K extends keyof T, O extends SortOrder> = readonly T[] & {
  readonly [__sortBy]: readonly [K, O];
};
