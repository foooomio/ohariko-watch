import { LongestStreaks } from "@/components/LongestStreaks";
import { MonthlyStats } from "@/components/MonthlyStats";
import { PostingTimeHistogram } from "@/components/PostingTimeHistogram";
import { PostingTimeScatter } from "@/components/PostingTimeScatter";
import { Summary } from "@/components/Summary";
import { TodaysPost } from "@/components/TodaysPost";
import { WeekdayStats } from "@/components/WeekdayStats";

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
