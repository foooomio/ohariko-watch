import { ActionIcon, Card, Group, Text, Title, Tooltip } from "@mantine/core";
import { GlobeIcon, XLogoIcon, YoutubeLogoIcon } from "@phosphor-icons/react";

export function Header() {
  return (
    <Card withBorder padding="lg" style={{ borderTop: "4px solid #ffe36c" }}>
      <Group justify="space-between">
        <Title size="h3">おはりこ観測所</Title>

        <Group gap="xs">
          <Text size="sm" visibleFrom="sm">
            司賀りこ公式リンク
          </Text>

          <Tooltip label="X (Twitter)" position="bottom">
            <ActionIcon
              component="a"
              href="https://x.com/Shigariko_"
              target="_blank"
              variant="default"
              color="gray"
              radius="xl"
            >
              <XLogoIcon />
            </ActionIcon>
          </Tooltip>

          <Tooltip label="YouTube" position="bottom">
            <ActionIcon
              component="a"
              href="https://www.youtube.com/@ShigaRiko"
              target="_blank"
              variant="default"
              color="gray"
              radius="xl"
            >
              <YoutubeLogoIcon />
            </ActionIcon>
          </Tooltip>

          <Tooltip label="にじさんじ公式" position="bottom">
            <ActionIcon
              component="a"
              href="https://www.nijisanji.jp/talents/l/riko-shiga"
              target="_blank"
              variant="default"
              color="gray"
              radius="xl"
            >
              <GlobeIcon />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Group>
    </Card>
  );
}
