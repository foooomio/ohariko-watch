import { Anchor, Card, Stack, Table, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { postsOptions } from "@/queries/stats";

export function Posts() {
  const { data } = useQuery({
    ...postsOptions,
    select: (data) => data.payload.toReversed(),
  });

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
                <Table.Th>日付</Table.Th>
                <Table.Th>時刻</Table.Th>
                <Table.Th>URL</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {data?.map(({ date, datetime, url }) => (
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
