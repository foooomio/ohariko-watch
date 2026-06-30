import { Container, Stack } from "@mantine/core";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import type { ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface Props {
  children: ReactNode;
}

export function Layout({ children }: Props) {
  return (
    <Container size="lg" py="lg">
      <Stack>
        <Header />
        <ErrorBoundary fallback="エラーが発生しました">
          {children}
        </ErrorBoundary>
        <Footer />
      </Stack>
    </Container>
  );
}
