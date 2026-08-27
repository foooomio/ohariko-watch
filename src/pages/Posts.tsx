import { Card, Stack, Title } from "@mantine/core";
import { useEffect, useState, useTransition } from "react";

import { PostsTable } from "@/components/PostsTable";

export function Posts() {
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
          投稿リスト
        </Title>
        {showTable && !isPending ? <PostsTable /> : "描画中..."}
      </Stack>
    </Card>
  );
}
