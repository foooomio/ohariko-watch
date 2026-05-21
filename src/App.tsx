import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main>
        <h1>おはりこ観測所</h1>
      </main>
    </QueryClientProvider>
  );
}
