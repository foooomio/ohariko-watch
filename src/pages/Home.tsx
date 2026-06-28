import { useQuery } from "@tanstack/react-query";
import { Layout } from "@/components/Layout";
import { Summary } from "@/components/Summary";
import { PostingTimeScatter } from "@/components/PostingTimeScatter";
import { PostingTimeHistogram } from "@/components/PostingTimeHistogram";
import { MonthlyStats } from "@/components/MonthlyStats";
import { WeekdayStats } from "@/components/WeekdayStats";
import { LongestStreaks } from "@/components/LongestStreaks";
import { postsOptions, streaksOptions } from "@/queries/stats";
import { sortedStreaksByDaysDesc } from "@/lib/streak";

export function Home() {
  const postsJson = useQuery(postsOptions());
  const streaksJson = useQuery(streaksOptions());

  if (postsJson.error || streaksJson.error) {
    console.error(postsJson.error, streaksJson.error);
  }

  const posts = postsJson.data.payload;
  const streaks = streaksJson.data.payload;

  const sortedStreaks = sortedStreaksByDaysDesc(streaks);

  const generatedAt = postsJson.data.generatedAt;

  return (
    <Layout lastUpdatedAt={generatedAt}>
      <Summary posts={posts} streaks={streaks} sortedStreaks={sortedStreaks} />
      <PostingTimeScatter posts={posts} />
      <PostingTimeHistogram posts={posts} />
      <MonthlyStats posts={posts} />
      <WeekdayStats posts={posts} />
      <LongestStreaks sortedStreaks={sortedStreaks} />
    </Layout>
  );
}
