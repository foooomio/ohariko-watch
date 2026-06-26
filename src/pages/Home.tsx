import { useQuery } from "@tanstack/react-query";
import { Layout } from "@/components/Layout";
import { Summary } from "@/components/Summary";
import { PostingTimeScatter } from "@/components/PostingTimeScatter";
import { PostingTimeHistogram } from "@/components/PostingTimeHistogram";
import { MonthlyStats } from "@/components/MonthlyStats";
import { WeekdayStats } from "@/components/WeekdayStats";
import { LongestStreaks } from "@/components/LongestStreaks";
import { statsJson } from "@/queries/stats";

export function Home() {
  const recordsJson = useQuery(statsJson.records);
  const streaksJson = useQuery(statsJson.streaks);

  if (recordsJson.error || streaksJson.error) {
    console.error(recordsJson.error, streaksJson.error);
  }

  const records = recordsJson.data.payload;
  const streaks = streaksJson.data.payload;

  const sortedStreaks = streaks.toSorted((a, b) =>
    b.days === a.days
      ? b.startDate.localeCompare(a.startDate)
      : b.days - a.days,
  );

  const generatedAt = recordsJson.data.generatedAt;

  return (
    <Layout lastUpdatedAt={generatedAt}>
      <Summary
        records={records}
        streaks={streaks}
        sortedStreaks={sortedStreaks}
      />
      <PostingTimeScatter records={records} />
      <PostingTimeHistogram records={records} />
      <MonthlyStats records={records} />
      <WeekdayStats records={records} />
      <LongestStreaks sortedStreaks={sortedStreaks} />
    </Layout>
  );
}
