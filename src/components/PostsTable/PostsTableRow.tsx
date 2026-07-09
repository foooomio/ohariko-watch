import { memo } from "react";
import { Anchor, Table } from "@mantine/core";
import type { Post } from "~/shared/types/stats";

export const PostsTableRow = memo(function PostsTableRow({
  date,
  datetime,
  url,
}: Post) {
  return (
    <Table.Tr>
      <Table.Td>{date.toString()}</Table.Td>
      <Table.Td>
        {datetime?.toLocaleString("sv", { timeStyle: "medium" }) ?? "投稿なし"}
      </Table.Td>
      <Table.Td>{url ? <Anchor href={url}>Post</Anchor> : "投稿なし"}</Table.Td>
    </Table.Tr>
  );
});
