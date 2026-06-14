import {
  Group,
  HoverCard,
  Stack,
  Text,
  ThemeIcon,
  Title,
  useMatches,
  type FloatingPosition,
} from "@mantine/core";
import { QuestionIcon } from "@phosphor-icons/react";

export function HeaderTitle() {
  const position = useMatches<FloatingPosition>({
    base: "bottom",
    md: "bottom-start",
  });

  return (
    <Group gap={1}>
      <Title size="h3">おはりこ観測所</Title>

      <HoverCard width="min(80vw, 500px)" position={position} shadow="md">
        <HoverCard.Target>
          <ThemeIcon variant="white" color="dark" style={{ cursor: "pointer" }}>
            <QuestionIcon />
          </ThemeIcon>
        </HoverCard.Target>
        <HoverCard.Dropdown>
          <Stack gap="xs">
            <Text size="md" fw={700}>
              このサイトについて
            </Text>
            <Text size="sm">
              にじさんじ所属ライバー・司賀りこ（しがりこ）の「おはりこ」を集計する非公式ファンサイトです。
            </Text>
            <Text size="sm">
              「おはりこ」とは、司賀りこがX（Twitter）に投稿する「おはよう」ポストです。投稿時刻が12:00より前なら成功、12:00以降なら失敗として集計しています。
            </Text>
          </Stack>
        </HoverCard.Dropdown>
      </HoverCard>
    </Group>
  );
}
