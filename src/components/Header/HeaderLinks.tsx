import { Group, Text, Tooltip } from "@mantine/core";
import { GlobeIcon, XLogoIcon, YoutubeLogoIcon } from "@phosphor-icons/react";
import { HeaderIcon } from "./HeaderIcon";

export function HeaderLinks() {
  return (
    <Group gap="xs">
      <Text size="sm">しがりこ公式リンク</Text>

      <Tooltip label="X (Twitter)" position="bottom">
        <HeaderIcon href="https://x.com/Shigariko_">
          <XLogoIcon />
        </HeaderIcon>
      </Tooltip>

      <Tooltip label="YouTube" position="bottom">
        <HeaderIcon href="https://www.youtube.com/@ShigaRiko">
          <YoutubeLogoIcon />
        </HeaderIcon>
      </Tooltip>

      <Tooltip label="にじさんじ公式" position="bottom">
        <HeaderIcon href="https://www.nijisanji.jp/talents/l/riko-shiga">
          <GlobeIcon />
        </HeaderIcon>
      </Tooltip>
    </Group>
  );
}
