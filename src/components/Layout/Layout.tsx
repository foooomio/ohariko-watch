import { Container, Stack } from "@mantine/core";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  lastUpdated: string;
}

export function Layout({ children, lastUpdated }: Props) {
  return (
    <Container size="lg" py="lg">
      <Stack>
        <Header />
        {children}
        <Footer lastUpdated={lastUpdated} />
      </Stack>
    </Container>
  );
}
