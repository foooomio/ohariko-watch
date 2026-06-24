import { Card, Group, Skeleton, Text } from "@mantine/core";
import type { ReactNode } from "react";

interface Props {
  label: string;
  metric: {
    value: number;
    formatter: (value: number) => string;
  };
  sub?: {
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
  sub,
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
          {sub && (
            <Text size="xs" c={sub.color(sub.value)}>
              {sub.formatter(sub.value)}
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
