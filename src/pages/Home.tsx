import { useQuery } from "@tanstack/react-query";
import { Layout } from "@/components/Layout";
import { Summary } from "@/components/Summary";
import { PostingTimeScatter } from "@/components/PostingTimeScatter";
import { PostingTimeHistogram } from "@/components/PostingTimeHistogram";
import { MonthlyStats } from "@/components/MonthlyStats";
import { WeekdayStats } from "@/components/WeekdayStats";
import { LongestStreaks } from "@/components/LongestStreaks";
import { statsQueries } from "@/queries/stats";
import { sortedStreaksByDaysDesc } from "@/lib/streak";

export function Home() {
  const recordsJson = useQuery(statsQueries.records);
  const streaksJson = useQuery(statsQueries.streaks);

  if (recordsJson.error || streaksJson.error) {
    console.error(recordsJson.error, streaksJson.error);
  }

  const records = recordsJson.data.payload;
  const streaks = streaksJson.data.payload;

  const sortedStreaks = sortedStreaksByDaysDesc(streaks);

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
