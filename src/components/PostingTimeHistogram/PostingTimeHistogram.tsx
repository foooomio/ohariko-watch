import {
  Card,
  Group,
  Skeleton,
  Stack,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { ChartBarIcon } from "@phosphor-icons/react";
import { PostingTimeHistogramChart } from "./PostingTimeHistogramChart";
import type { DailyRecord } from "~/shared/types/stats";

interface Props {
  records: DailyRecord[];
}

export function PostingTimeHistogram({ records }: Props) {
  const { colors } = useMantineTheme();

  return (
    <Card p={{ base: "lg", md: "xl" }}>
      <Stack gap="xl">
        <Group gap="xs">
          <ChartBarIcon size="20" />
          <Title order={2} size="h4">
            投稿時刻分布
          </Title>
        </Group>
        <Skeleton visible={records.length === 0} height={300}>
          <PostingTimeHistogramChart
            records={records}
            color={{
              success: colors.green[4],
              failure: colors.red[4],
            }}
          />
        </Skeleton>
      </Stack>
    </Card>
  );
}
