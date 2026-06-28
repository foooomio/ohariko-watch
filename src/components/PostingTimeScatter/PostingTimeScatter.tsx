import {
  Card,
  Group,
  Skeleton,
  Stack,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { ClockIcon } from "@phosphor-icons/react";
import { PostingTimeScatterChart } from "./PostingTimeScatterChart";
import type { SortedBy } from "~/shared/types/sortedBy";
import type { Post } from "~/shared/types/stats";

interface Props {
  posts: SortedBy<Post, "date", "asc">;
}

export function PostingTimeScatter({ posts }: Props) {
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
        <Skeleton visible={posts.length === 0} height={300}>
          <PostingTimeScatterChart
            posts={posts}
            color={{
              success: colors.green[4],
              failure: colors.red[4],
              trendLine: colors.cyan[6],
            }}
          />
        </Skeleton>
      </Stack>
    </Card>
  );
}
