import { lazy, Suspense } from "react";
import {
  Card,
  Group,
  Skeleton,
  Stack,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { ClockIcon } from "@phosphor-icons/react";

const PostingTimeScatterChart = lazy(() => import("./PostingTimeScatterChart"));

export function PostingTimeScatter() {
  const { colors } = useMantineTheme();

  return (
    <Card p={{ base: "lg", md: "xl" }}>
      <Stack gap="xl">
        <Group gap="xs">
          <ClockIcon size="20" />
          <Title order={2} size="h4">
            日別投稿時刻
          </Title>
        </Group>
        <Suspense fallback={<Skeleton height={300} />}>
          <PostingTimeScatterChart
            color={{
              success: colors.green[4],
              failure: colors.red[4],
              trendLine: colors.cyan[6],
            }}
          />
        </Suspense>
      </Stack>
    </Card>
  );
}
