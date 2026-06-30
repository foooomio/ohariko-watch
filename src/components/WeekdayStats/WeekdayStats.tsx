import { lazy, Suspense } from "react";
import {
  Card,
  Group,
  Skeleton,
  Stack,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { CalendarDotsIcon } from "@phosphor-icons/react";

const WeekdayStatsChart = lazy(() => import("./WeekdayStatsChart"));

export function WeekdayStats() {
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
        <Suspense fallback={<Skeleton height={300} />}>
          <WeekdayStatsChart
            color={{
              successRate: colors.green[4],
              failureRate: colors.red[2],
              averageTime: colors.cyan[6],
            }}
          />
        </Suspense>
      </Stack>
    </Card>
  );
}
