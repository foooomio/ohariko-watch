import {
  Group,
  HoverCard,
  Image,
  Stack,
  Text,
  Title,
  useMatches,
  type FloatingPosition,
} from "@mantine/core";
import { QuestionIcon } from "@phosphor-icons/react";
import Logo from "@/assets/logo.svg";

export function HeaderTitle() {
  const position = useMatches<FloatingPosition>({
    base: "bottom",
    md: "bottom-start",
  });

  return (
    <Group gap={8}>
      <Image src={Logo} w={24} h={24} radius="md" />
      <Title size="h3">おはりこ観測所</Title>

      <HoverCard width="min(80vw, 500px)" position={position} shadow="xs">
        <HoverCard.Target>
          <QuestionIcon
            size={24}
            style={{ cursor: "pointer", padding: "2px" }}
          />
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
              「おはりこ」とは、しがりこがX（Twitter）に投稿する「おはよう」ポストです。投稿時刻が12:00より前なら成功、12:00以降なら失敗として集計しています。
            </Text>
          </Stack>
        </HoverCard.Dropdown>
      </HoverCard>
    </Group>
  );
}
