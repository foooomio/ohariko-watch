import { Anchor, Card, Stack, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { postsOptions } from "@/queries/stats";

export function Footer() {
  const { data: lastUpdatedAt } = useQuery({
    ...postsOptions,
    select: (data) =>
      data.generatedAt.toLocaleString("sv", {
        dateStyle: "short",
        timeStyle: "medium",
      }),
  });

  return (
    <Card padding="lg">
      <Stack gap="xs">
        <Text size="xs" c="brown.8">
          おはりこ観測所は非公式ファンサイトです。司賀りこ様およびANYCOLOR株式会社様とは一切関係ありません。
        </Text>

        <Text size="xs" c="brown.8">
          このサイトのデータは
          <Anchor href="https://creativecommons.org/publicdomain/zero/1.0/deed.ja">
            CC0 1.0
          </Anchor>
          ライセンスのもと自由にご使用いただけます。
        </Text>

        <Text size="xs" c="brown.8">
          最終更新日時：{lastUpdatedAt}
        </Text>
      </Stack>
    </Card>
  );
}
