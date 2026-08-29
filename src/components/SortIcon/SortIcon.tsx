import { CaretDownIcon, CaretUpDownIcon, CaretUpIcon } from "@phosphor-icons/react";

import type { SortOption } from "~/shared/types/sortedBy";

interface Props<T> {
  sortKey: keyof T;
  sortOption: SortOption<T>;
}

export function SortIcon<T>({ sortKey, sortOption }: Props<T>) {
  if (sortOption.key !== sortKey) {
    return <CaretUpDownIcon />;
  }
  return sortOption.order === "asc" ? <CaretUpIcon /> : <CaretDownIcon />;
}
