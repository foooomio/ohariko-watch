import { Group, Text } from "@mantine/core";
import { ArrowSquareOutIcon } from "@phosphor-icons/react";
import type { Post } from "~/shared/types/stats";

interface Props {
  latestPost: Post | undefined;
}

export function TodaysPostCondition({ latestPost }: Props) {
  if (!latestPost) {
    return (
      <Text size="lg" fw={700}>
        取得中
      </Text>
    );
  }

  const today = Temporal.Now.plainDateISO("Asia/Tokyo");

  if (!today.equals(latestPost.date)) {
    return (
      <Text size="lg" fw={700}>
        未投稿
      </Text>
    );
  }

  if (!latestPost.datetime) {
    throw new Error(latestPost.toString());
  }

  const text = latestPost.datetime.hour < 12 ? "成功" : "失敗";
  const color = latestPost.datetime.hour < 12 ? "green" : "red";

  return (
    <a href={latestPost.url} target="_blank" style={{ textDecoration: "none" }}>
      <Group gap={8} align="baseline">
        <Text size="lg" c={color} fw={700}>
          {text}
        </Text>
        <Text size="xs" c={color}>
          {latestPost.datetime.toPlainTime().toString({
            smallestUnit: "minute",
          })}
        </Text>
        <Text c={color} style={{ position: "relative", top: "2px" }}>
          <ArrowSquareOutIcon />
        </Text>
      </Group>
    </a>
  );
}
