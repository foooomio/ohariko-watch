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
import type { DailyRecord } from "~/shared/types/stats";

interface Props {
  records: DailyRecord[];
}

export function PostingTimeScatter({ records }: Props) {
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
        <Skeleton visible={records.length === 0} height={300}>
          <PostingTimeScatterChart
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
