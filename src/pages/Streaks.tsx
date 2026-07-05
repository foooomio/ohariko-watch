import { Card, Stack, Table, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { sortedStreaksOptions } from "@/queries/stats";

export function Streaks() {
  const { data } = useQuery({
    ...sortedStreaksOptions,
    select: (data) => data.payload,
  });

  return (
    <Card>
      <Stack>
        <Title order={2} size="h4">
          連続記録リスト
        </Title>
        <Table.ScrollContainer minWidth={350}>
          <Table striped stripedColor="brown.0" tabularNums>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>順位</Table.Th>
                <Table.Th>日数</Table.Th>
                <Table.Th>開始日</Table.Th>
                <Table.Th>終了日</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {data?.map(({ days, startDate, endDate }, index) => (
                <Table.Tr key={`${startDate}_${endDate}`}>
                  <Table.Td>{index + 1}</Table.Td>
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
