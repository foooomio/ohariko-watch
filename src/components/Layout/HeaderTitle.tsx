import { Anchor, Group, Image, Title } from "@mantine/core";
import { Link } from "@tanstack/react-router";
import Logo from "@/assets/logo.svg";

export function HeaderTitle() {
  return (
    <Anchor component={Link} to="/" underline="never" c="black">
      <Group gap={8}>
        <Image src={Logo} w={24} h={24} radius="md" />
        <Title size="h3">おはりこ観測所</Title>
      </Group>
    </Anchor>
  );
}
