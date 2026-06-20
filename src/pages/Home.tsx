import { Layout } from "@/components/Layout";
import { Summary } from "@/components/Summary";
import { PostingTimeScatter } from "@/components/PostingTimeScatter";
import { PostingTimeHistogram } from "@/components/PostingTimeHistogram";
import { MonthlyStats } from "@/components/MonthlyStats";
import { WeekdayStats } from "@/components/WeekdayStats";
import { LongestStreaks } from "@/components/LongestStreaks";
import { useStatsJson } from "@/hooks/useStatsJson";

export function Home() {
  const recordsJson = useStatsJson("records");
  const streaksJson = useStatsJson("streaks");

  if (recordsJson.error || streaksJson.error) {
    console.error(recordsJson.error, streaksJson.error);
  }

  const records = recordsJson.data?.payload ?? [];
  const streaks = streaksJson.data?.payload ?? [];
  const sortedStreaks = streaks.toSorted((a, b) => b.days - a.days);

  const lastUpdated = recordsJson.data?.generatedAt
    ? new Date(recordsJson.data.generatedAt).toLocaleString("sv")
    : "";

  return (
    <Layout lastUpdated={lastUpdated}>
      <Summary
        records={records}
        currentStreak={streaks.at(-1)}
        longestStreak={sortedStreaks.at(0)}
      />
      <PostingTimeScatter records={records} />
      <PostingTimeHistogram records={records} />
      <MonthlyStats records={records} />
      <WeekdayStats records={records} />
      <LongestStreaks sortedStreaks={sortedStreaks} />
    </Layout>
  );
}
