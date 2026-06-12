import { Table } from "@mantine/core";
import type { Streak } from "~/shared/types/stats";

interface Props {
  streaks: Streak[];
}

export function LongestStreaks({ streaks }: Props) {
  const longestStreaks = streaks
    .toSorted((a, b) => b.days - a.days)
    .slice(0, 5);

  return (
    <Table striped="even" tabularNums>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>順位</Table.Th>
          <Table.Th>期間</Table.Th>
          <Table.Th>日数</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {longestStreaks.map(({ days, startDate, endDate }, index) => (
          <Table.Tr key={startDate + "_" + endDate}>
            <Table.Td>{index + 1}位</Table.Td>
            <Table.Td>
              {startDate} 〜 {endDate}
            </Table.Td>
            <Table.Td>{days}日</Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}
