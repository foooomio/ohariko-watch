import { Card, Group, Skeleton, Text } from "@mantine/core";
import type { ReactNode } from "react";

interface Props {
  label: string;
  metric: {
    value: number;
    formatter: (value: number) => string;
  };
  diff?: {
    value: number;
    formatter: (value: number) => string;
    color: (value: number) => string;
  };
  description: string;
  icon: ReactNode;
  isLoading: boolean;
}

export function SummaryCard({
  label,
  metric,
  diff,
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
        <Group align="baseline" gap="xs">
          <Text size="xl" fw={700}>
            {metric.formatter(metric.value)}
          </Text>
          {diff && (
            <Text size="xs" c={diff.color(diff.value)}>
              {diff.formatter(diff.value)}
            </Text>
          )}
        </Group>

        <Text size="xs" c="brown.8" textWrap="balance">
          {description}
        </Text>
      </Skeleton>
    </Card>
  );
}
