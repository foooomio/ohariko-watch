import { useEffect, useState, useTransition } from "react";
import { Card, Stack, Title } from "@mantine/core";
import { StreaksTable } from "@/components/StreaksTable";

export function Streaks() {
  const [isPending, startTransition] = useTransition();
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    startTransition(() => {
      setShowTable(true);
    });
  }, []);

  return (
    <Card mih="100vh">
      <Stack>
        <Title order={2} size="h4">
          連続記録リスト
        </Title>
        {showTable && !isPending ? <StreaksTable /> : "描画中..."}
      </Stack>
    </Card>
  );
}
