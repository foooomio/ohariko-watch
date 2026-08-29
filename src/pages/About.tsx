import { Anchor, Card, Stack, Text, Title } from "@mantine/core";

export function About() {
  return (
    <>
      <Card>
        <Stack>
          <Title order={2} size="h4">
            おはりこ観測所とは？
          </Title>
          <Text>
            にじさんじ所属ライバー
            <Anchor href="https://www.nijisanji.jp/talents/l/riko-shiga">
              司賀りこ（しがりこ）
            </Anchor>
            の「おはりこ」を集計・可視化する非公式ファンサイトです。
          </Text>
          <Text>
            「おはりこ」とは、司賀りこがX（Twitter）に投稿する朝の挨拶のポストです。デビュー（2024年6月19日）の翌日から始まり、ほぼ毎日投稿が続いています。
          </Text>
          <Text>
            投稿時刻が12:00より前なら「成功」、12:00以降なら「失敗」、投稿がなかった日は「投稿なし」として集計しています。投稿があった日でも、おはりこポストでない場合は、原則として「投稿なし」と判定しています。
          </Text>
        </Stack>
      </Card>

      <Card>
        <Stack>
          <Title order={2} size="h4">
            データについて
          </Title>
          <Text>データは手動更新のため、反映まで時間がかかる場合があります。</Text>
          <Text>
            このサイトのデータは、
            <Anchor href="https://creativecommons.org/publicdomain/zero/1.0/deed.ja">
              CC0 1.0
            </Anchor>
            ライセンスのもと自由にご使用いただけます。
          </Text>
          <Text>
            JSONファイルをプログラム等から直接参照してもかまいませんが、将来的にデータ構造を変更する可能性があります。その場合、事前にご連絡いたしますので、ご使用の際は運営者までご一報ください。
          </Text>
        </Stack>
      </Card>

      <Card>
        <Stack>
          <Title order={2} size="h4">
            免責事項
          </Title>
          <Text>
            おはりこ観測所は非公式ファンサイトです。司賀りこ様およびANYCOLOR株式会社様とは一切関係ありません。
          </Text>
          <Text>
            このサイトの情報は、正確性や完全性を保証するものではありません。情報の利用により生じる損害に対して、運営者は一切の責任を負いません。
          </Text>
        </Stack>
      </Card>

      <Card>
        <Stack>
          <Title order={2} size="h4">
            運営者について
          </Title>
          <Text>
            運営者ホームページ：
            <Anchor href="https://foooomio.net">foooomio.net</Anchor>
          </Text>
          <Text>
            問い合わせ先：
            <Anchor href="https://x.com/fooooooomio">@fooooooomio</Anchor>
          </Text>
          <Text>
            このサイトの
            <Anchor href="https://github.com/foooomio/ohariko-watch">ソースコード</Anchor>
            は、MITライセンスのもと公開しています。
          </Text>
        </Stack>
      </Card>

      <Card>
        <Stack>
          <Title order={2} size="h4">
            著作権表示
          </Title>
          <Anchor href="/license.md">使用しているライブラリのライセンス</Anchor>
        </Stack>
      </Card>
    </>
  );
}
