import { lazy, Suspense } from "react";
import {
  Card,
  Group,
  Skeleton,
  Stack,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { ChartBarIcon } from "@phosphor-icons/react";

const PostingTimeHistogramChart = lazy(
  () => import("./PostingTimeHistogramChart"),
);

export function PostingTimeHistogram() {
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

        <Suspense fallback={<Skeleton height={300} />}>
          <PostingTimeHistogramChart
            color={{
              success: colors.green[4],
              failure: colors.red[4],
            }}
          />
        </Suspense>
      </Stack>
    </Card>
  );
}
