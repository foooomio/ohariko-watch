import { useState } from "react";
import { Group, Table } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { streaksOptions } from "@/queries/stats";
import { SortIcon } from "@/components/SortIcon";
import { StreaksTableRow } from "./StreaksTableRow";
import { comparator } from "./comparator";
import type { Streak } from "~/shared/types/stats";
import type { SortOption, SortOrder } from "~/shared/types/sortedBy";

export function StreaksTable() {
  const [sortOption, setSortOption] = useState<SortOption<Streak>>({
    key: "days",
    order: "desc",
  });

  const { data } = useQuery(streaksOptions);

  const streaks = data?.payload.toSorted(comparator(sortOption)) ?? [];

  const onSortByDays = () => {
    let order: SortOrder = "asc";
    if (sortOption.key === "days" && sortOption.order === "asc") {
      order = "desc";
    }
    setSortOption({ key: "days", order });
  };

  const onSortByStartDate = () => {
    let order: SortOrder = "asc";
    if (sortOption.key === "startDate" && sortOption.order === "asc") {
      order = "desc";
    }
    setSortOption({ key: "startDate", order });
  };

  return (
    <Table.ScrollContainer minWidth={320}>
      <Table tabularNums>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>順位</Table.Th>
            <Table.Th onClick={onSortByDays} style={{ cursor: "pointer" }}>
              <Group justify="space-between">
                日数
                <SortIcon sortKey="days" sortOption={sortOption} />
              </Group>
            </Table.Th>
            <Table.Th onClick={onSortByStartDate} style={{ cursor: "pointer" }}>
              <Group justify="space-between">
                開始日
                <SortIcon sortKey="startDate" sortOption={sortOption} />
              </Group>
            </Table.Th>
            <Table.Th onClick={onSortByStartDate} style={{ cursor: "pointer" }}>
              <Group justify="space-between">
                終了日
                <SortIcon sortKey="startDate" sortOption={sortOption} />
              </Group>
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {streaks.map((streak) => (
            <StreaksTableRow key={streak.startDate.toString()} {...streak} />
          ))}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
