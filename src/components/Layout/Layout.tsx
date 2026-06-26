import { Container, Stack } from "@mantine/core";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  lastUpdatedAt: number;
}

export function Layout({ children, lastUpdatedAt }: Props) {
  return (
    <Container size="lg" py="lg">
      <Stack>
        <Header />
        {children}
        <Footer lastUpdatedAt={lastUpdatedAt} />
      </Stack>
    </Container>
  );
}
