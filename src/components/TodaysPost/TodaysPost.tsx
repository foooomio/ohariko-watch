import { Card, Group, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";

import { postsOptions } from "@/queries/stats";

import { TodaysPostCondition } from "./TodaysPostCondition";

export function TodaysPost() {
  const { data } = useQuery({
    ...postsOptions,
    select: (data) => data.payload.at(-1),
  });

  return (
    <Card>
      <Group justify="space-between">
        <Title order={2} size="h4">
          本日のおはりこ
        </Title>
        <TodaysPostCondition latestPost={data} />
      </Group>
    </Card>
  );
}
