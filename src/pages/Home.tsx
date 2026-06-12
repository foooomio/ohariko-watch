import { Container, Stack } from "@mantine/core";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Dashboard } from "@/components/Dashboard";

export function Home() {
  return (
    <Container size="lg" py="lg">
      <Stack>
        <Header />
        <Dashboard />
        <Footer />
      </Stack>
    </Container>
  );
}
