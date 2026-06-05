import { PostingTimeScatterChart } from "@/components/charts/PostingTimeScatter/Chart";
import { PostingTimeHistogramChart } from "@/components/charts/PostingTimeHistogram/Chart";
import { MonthlyTrendChart } from "@/components/charts/MonthlyTrend/Chart";
import { WeekdayOverview } from "@/components/charts/WeekdayOverview/Chart";
import { useDailyRecords } from "@/hooks/useDailyRecords";

export function Home() {
  const { data } = useDailyRecords();

  if (!data) {
    return null;
  }

  return (
    <main>
      <h1>おはりこ観測所</h1>
      <PostingTimeScatterChart records={data.payload} />
      <PostingTimeHistogramChart records={data.payload} />
      <MonthlyTrendChart records={data.payload} />
      <WeekdayOverview records={data.payload} />
    </main>
  );
}
