declare const __sortBy: unique symbol;

export type SortedBy<
  T,
  K extends keyof T,
  O extends "asc" | "desc",
> = readonly T[] & { readonly [__sortBy]: readonly [K, O] };
