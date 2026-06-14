import { Group, HoverCard, Text, Title } from "@mantine/core";
import { QuestionIcon } from "@phosphor-icons/react";

export function HeaderTitle() {
  return (
    <Group gap="xs">
      <Title size="h3">おはりこ観測所</Title>
      <HoverCard>
        <HoverCard.Target>
          <QuestionIcon />
        </HoverCard.Target>
        <HoverCard.Dropdown>
          <Text>aaa</Text>
        </HoverCard.Dropdown>
      </HoverCard>
    </Group>
  );
}
