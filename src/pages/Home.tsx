import { PostingTimeScatter } from "@/components/charts/PostingTimeScatter";
import { PostingTimeHistogram } from "@/components/charts/PostingTimeHistogram";
import { MonthlyTrend } from "@/components/charts/MonthlyTrend";
import { WeekdayOverview } from "@/components/charts/WeekdayOverview";
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
      <MonthlyTrend records={data.payload} />
      <WeekdayOverview records={data.payload} />
    </main>
  );
}
