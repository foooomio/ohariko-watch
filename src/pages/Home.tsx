import { PostingTimeScatter } from "@/components/charts/PostingTimeScatter";
import { PostingTimeHistogram } from "@/components/charts/PostingTimeHistogram";
import { MonthlyStats } from "@/components/charts/MonthlyStats";
import { WeekdayStats } from "@/components/charts/WeekdayStats";
import { useDailyRecords } from "@/hooks/useDailyRecords";

export function Home() {
  const { data } = useDailyRecords();

  if (!data) {
    return null;
  }

  return (
    <main>
      <h1>おはりこ観測所</h1>
      <PostingTimeScatter records={data.payload} />
      <PostingTimeHistogram records={data.payload} />
      <MonthlyStats records={data.payload} />
      <WeekdayStats records={data.payload} />
    </main>
  );
}
