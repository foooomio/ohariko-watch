import { Card, Stack, Title } from "@mantine/core";
import type { ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
}

export function ChartCard({ title, children }: Props) {
  return (
    <Card withBorder p={{ base: "lg", md: "xl" }}>
      <Stack gap="lg">
        <Title order={3}>{title}</Title>
        {children}
      </Stack>
    </Card>
  );
}
