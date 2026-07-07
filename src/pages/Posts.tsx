import { useMemo, useState } from "react";
import { Anchor, Card, Group, Stack, Table, Title } from "@mantine/core";
import {
  CaretDownIcon,
  CaretUpDownIcon,
  CaretUpIcon,
} from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import { postsOptions } from "@/queries/stats";
import {
  byDateAsc,
  byDateDesc,
  byElapsedAsc,
  byElapsedDesc,
} from "~/shared/lib/comparators/posts";
import type { Post } from "~/shared/types/stats";
import type { SortOption, SortOrder } from "~/shared/types/sortedBy";

function comparator({
  key,
  order,
}: SortOption<Post>): (a: Post, b: Post) => number {
  switch (key) {
    case "elapsed":
      return order === "asc" ? byElapsedAsc : byElapsedDesc;
    default:
      return order === "asc" ? byDateAsc : byDateDesc;
  }
}

function SortIcon({
  sortKey,
  sortOption,
}: {
  sortKey: keyof Post;
  sortOption: SortOption<Post>;
}) {
  if (sortOption.key !== sortKey) {
    return <CaretUpDownIcon />;
  }
  return sortOption.order === "asc" ? <CaretUpIcon /> : <CaretDownIcon />;
}

export function Posts() {
  const [sortOption, setSortOption] = useState<SortOption<Post>>({
    key: "date",
    order: "desc",
  });

  const { data } = useQuery(postsOptions);

  const posts = useMemo(
    () => data?.payload.toSorted(comparator(sortOption)) ?? [],
    [data, sortOption],
  );

  const onSortByDate = () => {
    let order: SortOrder = "asc";
    if (sortOption.key === "date" && sortOption.order === "asc") {
      order = "desc";
    }
    setSortOption({ key: "date", order });
  };

  const onSortByElapsed = () => {
    let order: SortOrder = "asc";
    if (sortOption.key === "elapsed" && sortOption.order === "asc") {
      order = "desc";
    }
    setSortOption({ key: "elapsed", order });
  };

  return (
    <Card>
      <Stack>
        <Title order={2} size="h4">
          投稿リスト
        </Title>
        <Table.ScrollContainer minWidth={320}>
          <Table tabularNums>
            <Table.Thead>
              <Table.Tr>
                <Table.Th onClick={onSortByDate} style={{ cursor: "pointer" }}>
                  <Group justify="space-between">
                    日付
                    <SortIcon sortKey="date" sortOption={sortOption} />
                  </Group>
                </Table.Th>
                <Table.Th
                  onClick={onSortByElapsed}
                  style={{ cursor: "pointer" }}
                >
                  <Group justify="space-between">
                    時刻
                    <SortIcon sortKey="elapsed" sortOption={sortOption} />
                  </Group>
                </Table.Th>
                <Table.Th>URL</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {posts.map(({ date, datetime, url }) => (
                <Table.Tr key={date.toString()}>
                  <Table.Td>{date.toString()}</Table.Td>
                  <Table.Td>
                    {datetime?.toLocaleString("sv", {
                      timeStyle: "medium",
                    }) ?? "投稿なし"}
                  </Table.Td>
                  <Table.Td>
                    {url ? <Anchor href={url}>Post</Anchor> : "投稿なし"}
                  </Table.Td>
                </Table.Tr>
              )) ?? null}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </Stack>
    </Card>
  );
}
