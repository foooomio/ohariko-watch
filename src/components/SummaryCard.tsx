import { Card, Text } from "@mantine/core";

interface Props {
  label: string;
  metric: string;
  description: string;
}

export function SummaryCard({ label, metric, description }: Props) {
  return (
    <Card withBorder padding="lg">
      <Text size="sm">{label}</Text>

      <Text size="xl" fw={700}>
        {metric}
      </Text>

      <Text size="xs" c="dimmed" textWrap="balance">
        {description}
      </Text>
    </Card>
  );
}
