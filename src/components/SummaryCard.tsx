import { Card, Group, Text } from "@mantine/core";
import type { ReactNode } from "react";

interface Props {
  label: string;
  metric: string;
  description: string;
  icon: ReactNode;
}

export function SummaryCard({ label, metric, description, icon }: Props) {
  return (
    <Card withBorder padding="lg">
      <Group gap="xs">
        {icon}
        <Text size="sm">{label}</Text>
      </Group>

      <Text size="xl" fw={700}>
        {metric}
      </Text>

      <Text size="xs" c="dimmed" textWrap="balance">
        {description}
      </Text>
    </Card>
  );
}
