import { PostTimeScatterChart } from "@/components/charts/PostTimeScatterChart";
import { useDailyRecords } from "@/hooks/useDailyRecords";

export function Home() {
  const { data } = useDailyRecords();

  if (!data) {
    return null;
  }

  return (
    <main>
      <h1>おはりこ観測所</h1>
      <PostTimeScatterChart records={data.payload} />
    </main>
  );
}
