import {
  Button,
  Card,
  Group,
  Skeleton,
  Stack,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { RankingIcon } from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { sortedStreaksOptions } from "@/queries/stats";

export function LongestStreaks() {
  const { data } = useQuery({
    ...sortedStreaksOptions,
    select: (data) => data.payload.slice(0, 3),
  });

  return (
    <Card p={{ base: "lg", md: "xl" }}>
      <Stack>
        <Group justify="space-between">
          <Group gap="xs">
            <RankingIcon size="20" />
            <Title order={2} size="h4">
              連続記録ランキング
            </Title>
          </Group>
          <Button
            component={Link}
            to="/streaks"
            size="compact-sm"
            variant="white"
            c="brown.8"
          >
            すべて見る
          </Button>
        </Group>
        <Skeleton visible={!data}>
          <Table tabularNums>
            <Table.Thead>
              <Table.Tr>
                <Table.Th w={16}></Table.Th>
                <Table.Th>順位</Table.Th>
                <Table.Th>日数</Table.Th>
                <Table.Th>期間</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {data?.map(({ days, startDate, endDate }, index) => (
                <Table.Tr key={`${startDate}_${endDate}`}>
                  <Table.Td>{["🥇", "🥈", "🥉"][index]}</Table.Td>
                  <Table.Td>
                    <Text fw={700} textWrap="nowrap">
                      {index + 1}位
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Text fw={700} textWrap="nowrap">
                      {days}日
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Text textWrap="balance">
                      {`${startDate}\u00A0\u200B〜\u00A0${endDate}`}
                    </Text>
                  </Table.Td>
                </Table.Tr>
              )) ?? null}
            </Table.Tbody>
          </Table>
        </Skeleton>
      </Stack>
    </Card>
  );
}
