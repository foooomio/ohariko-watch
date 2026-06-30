import { Card, Group, Title } from "@mantine/core";
import { TodaysPostCondition } from "./TodaysPostCondition";
import { useQuery } from "@tanstack/react-query";
import { postsOptions } from "@/queries/stats";

export function TodaysPost() {
  const { data } = useQuery(postsOptions());
  const latestPost = data?.payload.at(-1);

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
