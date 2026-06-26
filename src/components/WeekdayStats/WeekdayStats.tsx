import {
  Card,
  Group,
  Skeleton,
  Stack,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { CalendarDotsIcon } from "@phosphor-icons/react";
import { WeekdayStatsChart } from "./WeekdayStatsChart";
import type { DailyRecord } from "~/shared/types/stats";

interface Props {
  records: readonly DailyRecord[];
}

export function WeekdayStats({ records }: Props) {
  const { colors } = useMantineTheme();

  return (
    <Card p={{ base: "lg", md: "xl" }}>
      <Stack gap="xl">
        <Group gap="xs">
          <CalendarDotsIcon size="20" />
          <Title order={2} size="h4">
            曜日別分析
          </Title>
        </Group>
        <Skeleton visible={records.length === 0} height={300}>
          <WeekdayStatsChart
            records={records}
            color={{
              successRate: colors.green[4],
              failureRate: colors.red[2],
              averageTime: colors.cyan[6],
            }}
          />
        </Skeleton>
      </Stack>
    </Card>
  );
}
