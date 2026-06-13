import { Card, Group, Stack, Title } from "@mantine/core";
import type { ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
  icon: ReactNode;
}

export function ChartCard({ title, children, icon }: Props) {
  return (
    <Card withBorder p={{ base: "lg", md: "xl" }}>
      <Stack gap="xl">
        <Group gap="xs">
          {icon}
          <Title order={2} size="h4">
            {title}
          </Title>
        </Group>
        {children}
      </Stack>
    </Card>
  );
}
