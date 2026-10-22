import type { QueryClient } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";

import { Layout } from "@/components/Layout";
import { postsOptions, streaksOptions } from "@/queries/stats";

interface Context {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<Context>()({
  loader: ({ context }) => {
    context.queryClient.query({ ...postsOptions, staleTime: "static" });
    context.queryClient.query({ ...streaksOptions, staleTime: "static" });
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
