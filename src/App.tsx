import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@mantine/core/styles.css";
import "./global.css";

import { Home } from "@/pages/Home";

const queryClient = new QueryClient();

export function App() {
  return (
    <MantineProvider>
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    </MantineProvider>
  );
}
