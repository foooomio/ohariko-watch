import { Stack, Table, Text } from "@mantine/core";
import type { Streak } from "~/shared/types/stats";

interface Props {
  streaks: Streak[];
}

export function LongestStreaks({ streaks }: Props) {
  const sortedStreaks = streaks.toSorted((a, b) => b.days - a.days);

  const emoji = ["🥇", "🥈", "🥉"];

  return (
    <Stack>
      <Table.ScrollContainer
        minWidth={400}
        maxHeight={230}
        scrollAreaProps={{
          type: "auto",
          overscrollBehavior: "none",
        }}
      >
        <Table striped tabularNums>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>順位</Table.Th>
              <Table.Th>日数</Table.Th>
              <Table.Th>期間</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {sortedStreaks.map(({ days, startDate, endDate }, index) => (
              <Table.Tr key={startDate + "_" + endDate}>
                <Table.Td>
                  <Text fw={700}>
                    {emoji[index]} {index + 1}位
                  </Text>
                </Table.Td>
                <Table.Td>
                  <Text fw={700}>{days}日</Text>
                </Table.Td>
                <Table.Td>
                  {startDate} 〜 {endDate}
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </Stack>
  );
}
