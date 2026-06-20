import {
  Card,
  Group,
  Skeleton,
  Stack,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { RankingIcon } from "@phosphor-icons/react";
import type { Streak } from "~/shared/types/stats";
import { buildStreaksTableData } from "./buildStreaksTableData";

interface Props {
  sortedStreaks: Streak[];
}

export function LongestStreaks({ sortedStreaks }: Props) {
  const rows = buildStreaksTableData(sortedStreaks);

  return (
    <Card p={{ base: "lg", md: "xl" }}>
      <Stack>
        <Group gap="xs">
          <RankingIcon size="20" />
          <Title order={2} size="h4">
            連続成功ランキング
          </Title>
        </Group>
        <Skeleton visible={sortedStreaks.length === 0} height={230}>
          <Table.ScrollContainer
            minWidth={400}
            maxHeight={230}
            scrollAreaProps={{
              type: "auto",
              overscrollBehavior: "none",
            }}
          >
            <Table striped stripedColor="brown.0" tabularNums>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>順位</Table.Th>
                  <Table.Th>日数</Table.Th>
                  <Table.Th>期間</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {rows.map(({ key, rank, daysStr, period }) => (
                  <Table.Tr key={key}>
                    <Table.Td>
                      <Text fw={700}>{rank}</Text>
                    </Table.Td>
                    <Table.Td>
                      <Text fw={700}>{daysStr}</Text>
                    </Table.Td>
                    <Table.Td>{period}</Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Table.ScrollContainer>
        </Skeleton>
      </Stack>
    </Card>
  );
}
