import { MantineProvider } from "@mantine/core";
import { theme } from "@/lib/mantine";
import "@mantine/core/styles.css";
import "./global.css";

import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { queryClient, router } from "./router";

export function App() {
  return (
    <MantineProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </MantineProvider>
  );
}
