import { Card, Group, Stack, Title, useMantineTheme } from "@mantine/core";
import { CalendarDotsIcon } from "@phosphor-icons/react";
import { WeekdayStatsChart } from "./WeekdayStatsChart";
import type { DailyRecord } from "~/shared/types/stats";

interface Props {
  records: DailyRecord[];
}

export function WeekdayStats({ records }: Props) {
  const { colors } = useMantineTheme();

  return (
    <Card withBorder p={{ base: "lg", md: "xl" }}>
      <Stack gap="xl">
        <Group gap="xs">
          <CalendarDotsIcon size="20" />
          <Title order={2} size="h4">
            月別推移
          </Title>
        </Group>
        <WeekdayStatsChart
          records={records}
          color={{
            successRate: colors.green[4],
            averageTime: colors.cyan[6],
          }}
        />
      </Stack>
    </Card>
  );
}
