import { Card, Group, Stack } from "@mantine/core";
import { FooterLink } from "./FooterLink";
import { FooterText } from "./FooterText";
import { useQuery } from "@tanstack/react-query";
import { postsOptions } from "@/queries/stats";

export function Footer() {
  const { data } = useQuery(postsOptions());
  const lastUpdatedAt = data?.generatedAt.toString({
    smallestUnit: "second",
    timeZoneName: "never",
  });

  return (
    <Card padding="lg">
      <Stack gap="xs">
        <FooterText>
          おはりこ観測所は非公式ファンサイトです。司賀りこ様およびANYCOLOR株式会社様とは一切関係ありません。
        </FooterText>

        <FooterText>
          このサイトのデータは
          <FooterLink href="https://creativecommons.org/publicdomain/zero/1.0/">
            CC0 1.0
          </FooterLink>
          のライセンスのもと自由にご使用いただけます。
        </FooterText>

        <Group gap="xs">
          <FooterLink href="https://foooomio.net">運営者について</FooterLink>
          <FooterLink href="https://x.com/fooooooomio">問い合わせ先</FooterLink>
          <FooterLink href="https://github.com/foooomio/ohariko-watch">
            ソースコード
          </FooterLink>
        </Group>

        <FooterText>最終更新日時：{lastUpdatedAt}</FooterText>
      </Stack>
    </Card>
  );
}
