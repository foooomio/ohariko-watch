import { Card, Group, Stack, Text } from "@mantine/core";
import { FooterLink } from "./FooterLink";

interface Props {
  lastUpdated: string;
}

export function Footer({ lastUpdated }: Props) {
  return (
    <Card withBorder padding="lg">
      <Stack gap="xs">
        <Text size="xs" c="dimmed">
          おはりこ観測所は非公式ファンサイトです。司賀りこ様およびANYCOLOR株式会社様とは一切関係ありません。
        </Text>

        <Text size="xs" c="dimmed">
          このサイトのデータは
          <FooterLink href="https://creativecommons.org/publicdomain/zero/1.0/">
            CC0 1.0
          </FooterLink>
          のライセンスのもと自由にご使用いただけます。
        </Text>

        <Group gap="xs">
          <FooterLink href="https://foooomio.net">運営者について</FooterLink>
          <FooterLink href="https://x.com/fooooooomio">問い合わせ先</FooterLink>
          <FooterLink href="https://github.com/foooomio/ohariko-watch">
            ソースコード
          </FooterLink>
        </Group>

        <Text size="xs" c="dimmed">
          最終更新日時：{lastUpdated}
        </Text>
      </Stack>
    </Card>
  );
}
