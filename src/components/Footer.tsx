import { Card, Flex, Stack, Text } from "@mantine/core";
import { FooterLink } from "./FooterLink";

export function Footer() {
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
          のライセンスのもとご使用いただけます。
        </Text>

        <Flex gap="xs">
          <FooterLink href="https://x.com/Shigariko_">
            司賀りこX (Twitter)
          </FooterLink>
          <FooterLink href="https://foooomio.net">運営者について</FooterLink>
          <FooterLink href="https://github.com/foooomio/ohariko-watch">
            ソースコード
          </FooterLink>
        </Flex>
      </Stack>
    </Card>
  );
}
