import { Card, Group } from "@mantine/core";
import { HeaderTitle } from "./HeaderTitle";
import { HeaderLinks } from "./HeaderLinks";

export function Header() {
  return (
    <Card withBorder padding="lg" style={{ borderTop: "4px solid #ffe36c" }}>
      <Group justify="space-between">
        <HeaderTitle />
        <HeaderLinks />
      </Group>
    </Card>
  );
}
