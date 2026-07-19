import { useState } from "react";
import { Group, Table } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { postsOptions } from "@/queries/stats";
import { SortIcon } from "@/components/SortIcon";
import { PostsTableRow } from "./PostsTableRow";
import { comparator } from "./comparator";
import type { Post } from "~/shared/types/stats";
import type { SortOption, SortOrder } from "~/shared/types/sortedBy";

export function PostsTable() {
  const [sortOption, setSortOption] = useState<SortOption<Post>>({
    key: "date",
    order: "desc",
  });

  const { data } = useQuery(postsOptions);

  const posts = data.toSorted(comparator(sortOption));

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
    <Table.ScrollContainer minWidth={320}>
      <Table tabularNums>
        <Table.Thead>
          <Table.Tr>
            <Table.Th onClick={onSortByDate} style={{ cursor: "pointer" }}>
              <Group justify="space-between" gap="xs">
                日付
                <SortIcon sortKey="date" sortOption={sortOption} />
              </Group>
            </Table.Th>
            <Table.Th onClick={onSortByElapsed} style={{ cursor: "pointer" }}>
              <Group justify="space-between" gap="xs">
                時刻
                <SortIcon sortKey="elapsed" sortOption={sortOption} />
              </Group>
            </Table.Th>
            <Table.Th>URL</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {posts.map((post) => (
            <PostsTableRow key={post.date.toString()} {...post} />
          ))}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
