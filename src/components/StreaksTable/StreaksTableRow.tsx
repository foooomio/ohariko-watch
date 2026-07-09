import { memo } from "react";
import { Table } from "@mantine/core";
import type { Streak } from "~/shared/types/stats";

export const StreaksTableRow = memo(function StreaksTableRow({
  rank,
  days,
  startDate,
  endDate,
}: Streak) {
  return (
    <Table.Tr>
      <Table.Td>{rank}</Table.Td>
      <Table.Td>{days}</Table.Td>
      <Table.Td>{startDate.toString()}</Table.Td>
      <Table.Td>{endDate.toString()}</Table.Td>
    </Table.Tr>
  );
});
