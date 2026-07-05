import { createFileRoute } from "@tanstack/react-router";
import { Streaks } from "@/pages/Streaks";

export const Route = createFileRoute("/streaks")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Streaks />;
}
