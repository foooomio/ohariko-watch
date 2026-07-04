import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { postsOptions, streaksOptions } from "@/queries/stats";
import type { QueryClient } from "@tanstack/react-query";

interface Context {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<Context>()({
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(postsOptions);
    context.queryClient.ensureQueryData(streaksOptions);
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
