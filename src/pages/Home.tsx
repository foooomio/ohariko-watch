import { TodaysPost } from "@/components/TodaysPost";
import { Summary } from "@/components/Summary";
import { PostingTimeScatter } from "@/components/PostingTimeScatter";
import { PostingTimeHistogram } from "@/components/PostingTimeHistogram";
import { MonthlyStats } from "@/components/MonthlyStats";
import { WeekdayStats } from "@/components/WeekdayStats";
import { LongestStreaks } from "@/components/LongestStreaks";

export function Home() {
  return (
    <>
      <TodaysPost />
      <Summary />
      <PostingTimeScatter />
      <PostingTimeHistogram />
      <MonthlyStats />
      <WeekdayStats />
      <LongestStreaks />
    </>
  );
}
