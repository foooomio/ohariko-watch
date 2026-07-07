import { useMemo, useState } from "react";
import { Card, Group, Stack, Table, Title } from "@mantine/core";
import {
  CaretDownIcon,
  CaretUpDownIcon,
  CaretUpIcon,
} from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import { streaksOptions } from "@/queries/stats";
import {
  byDaysAsc,
  byDaysDesc,
  byStartDateAsc,
  byStartDateDesc,
} from "~/shared/lib/comparators/streaks";
import type { Streak } from "~/shared/types/stats";
import type { SortOption, SortOrder } from "~/shared/types/sortedBy";

function comparator({
  key,
  order,
}: SortOption<Streak>): (a: Streak, b: Streak) => number {
  switch (key) {
    case "days":
      return order === "asc" ? byDaysAsc : byDaysDesc;
    default:
      return order === "asc" ? byStartDateAsc : byStartDateDesc;
  }
}

function SortIcon({
  sortKey,
  sortOption,
}: {
  sortKey: keyof Streak;
  sortOption: SortOption<Streak>;
}) {
  if (sortOption.key !== sortKey) {
    return <CaretUpDownIcon />;
  }
  return sortOption.order === "asc" ? <CaretUpIcon /> : <CaretDownIcon />;
}

export function Streaks() {
  const [sortOption, setSortOption] = useState<SortOption<Streak>>({
    key: "days",
    order: "desc",
  });

  const { data } = useQuery(streaksOptions);

  const streaks = useMemo(
    () => data?.payload.toSorted(comparator(sortOption)) ?? [],
    [data, sortOption],
  );

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
    <Card>
      <Stack>
        <Title order={2} size="h4">
          連続記録リスト
        </Title>
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
                <Table.Th
                  onClick={onSortByStartDate}
                  style={{ cursor: "pointer" }}
                >
                  <Group justify="space-between">
                    開始日
                    <SortIcon sortKey="startDate" sortOption={sortOption} />
                  </Group>
                </Table.Th>
                <Table.Th
                  onClick={onSortByStartDate}
                  style={{ cursor: "pointer" }}
                >
                  <Group justify="space-between">
                    終了日
                    <SortIcon sortKey="startDate" sortOption={sortOption} />
                  </Group>
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {streaks.map(({ rank, days, startDate, endDate }) => (
                <Table.Tr key={`${startDate}_${endDate}`}>
                  <Table.Td>{rank}</Table.Td>
                  <Table.Td>{days}</Table.Td>
                  <Table.Td>{startDate.toString()}</Table.Td>
                  <Table.Td>{endDate.toString()}</Table.Td>
                </Table.Tr>
              )) ?? null}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </Stack>
    </Card>
  );
}
