import { Card, Group, Skeleton, Text } from "@mantine/core";
import type { ReactNode } from "react";

interface Props {
  label: string;
  metric: string;
  description: string;
  icon: ReactNode;
  isLoading: boolean;
}

export function SummaryCard({
  label,
  metric,
  description,
  icon,
  isLoading,
}: Props) {
  return (
    <Card padding="lg">
      <Group gap={6}>
        {icon}
        <Text size="sm">{label}</Text>
      </Group>

      <Skeleton visible={isLoading}>
        <Text size="xl" fw={700}>
          {metric}
        </Text>

        <Text size="xs" c="brown.8" textWrap="balance">
          {description}
        </Text>
      </Skeleton>
    </Card>
  );
}
