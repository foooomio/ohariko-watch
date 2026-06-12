import { useDailyRecords } from "@/hooks/useDailyRecords";
import { Card, Flex, Text, Title } from "@mantine/core";

export function Header() {
  const { data } = useDailyRecords();

  if (!data) {
    return null;
  }

  const lastUpdated = new Date(data.generatedAt).toLocaleString("sv");

  return (
    <Card withBorder padding="lg">
      <Flex justify="space-between" align="center" wrap="wrap">
        <Title>おはりこ観測所</Title>
        <Text size="xs" c="dimmed">
          最終更新：{lastUpdated}
        </Text>
      </Flex>
    </Card>
  );
}
