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
import type { Post } from "~/shared/types/stats";

interface Props {
  posts: readonly Post[];
}

export function WeekdayStats({ posts }: Props) {
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
        <Skeleton visible={posts.length === 0} height={300}>
          <WeekdayStatsChart
            posts={posts}
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
