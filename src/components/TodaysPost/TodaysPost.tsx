import { Card, Group, Title } from "@mantine/core";
import { TodaysPostCondition } from "./TodaysPostCondition";
import type { Post } from "~/shared/types/stats";

interface Props {
  latestPost: Post | undefined;
}

export function TodaysPost({ latestPost }: Props) {
  return (
    <Card>
      <Group justify="space-between">
        <Title order={2} size="h4">
          本日のおはりこ
        </Title>
        <TodaysPostCondition latestPost={latestPost} />
      </Group>
    </Card>
  );
}
