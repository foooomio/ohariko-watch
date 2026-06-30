import { Grid } from "@mantine/core";
import { SummaryCard } from "./SummaryCard";
import { buildSummaryData } from "./buildSummaryData";
import { MINUTE, toPlainTime } from "~/shared/lib/date";
import {
  ClockIcon,
  SunIcon,
  TrendUpIcon,
  TrophyIcon,
} from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import { postsOptions, streaksOptions } from "@/queries/stats";
import { useSortedStreaks } from "@/hooks/useSortedStreaks";

export function Summary() {
  const { data: postsData } = useQuery(postsOptions());
  const { data: streaksData } = useQuery(streaksOptions());

  const posts = postsData?.payload ?? [];
  const streaks = streaksData?.payload ?? [];
  const sortedStreaks = useSortedStreaks(streaks);

  const recent = buildSummaryData(posts.slice(-30));
  const previous = buildSummaryData(posts.slice(-60, -30));

  const latestStreak = streaks.at(-1);
  const longestStreak = sortedStreaks.at(0);

  const latestPost = posts.at(-1);
  const isStreakOngoing =
    latestStreak && latestPost && latestStreak.endDate.equals(latestPost.date);
  const latestStreakIndex = sortedStreaks.findIndex((streak) =>
    latestStreak?.startDate.equals(streak.startDate),
  );

  return (
    <Grid>
      <Grid.Col span={{ base: 6, md: 3 }}>
        <SummaryCard
          label="おはりこ成功率"
          metric={{
            value: recent.successRate,
            formatter: (value) =>
              value.toLocaleString("ja", {
                style: "percent",
                maximumFractionDigits: 1,
              }),
          }}
          sub={{
            value: recent.successRate - previous.successRate,
            formatter: (value) =>
              (value * 100).toLocaleString("ja", {
                maximumFractionDigits: 1,
                signDisplay: "always",
              }) + "pt",
            color: (value) => (value < 0 ? "red" : "green"),
          }}
          description="直近30日間"
          icon={<SunIcon />}
          isLoading={posts.length === 0}
        />
      </Grid.Col>

      <Grid.Col span={{ base: 6, md: 3 }}>
        <SummaryCard
          label="平均投稿時刻"
          metric={{
            value: recent.averageTime,
            formatter: (value) =>
              toPlainTime(Math.round(value)).toString({
                smallestUnit: "minute",
              }),
          }}
          sub={{
            value: recent.averageTime - previous.averageTime,
            formatter: (value) =>
              (value / MINUTE).toLocaleString("ja", {
                maximumFractionDigits: 0,
                signDisplay: "always",
              }) + "分",
            color: (value) => (value < 0 ? "green" : "red"),
          }}
          description="直近30日間"
          icon={<ClockIcon />}
          isLoading={posts.length === 0}
        />
      </Grid.Col>

      <Grid.Col span={{ base: 6, md: 3 }}>
        <SummaryCard
          label={(isStreakOngoing ? "現在" : "前回") + "連続成功"}
          metric={{
            value: latestStreak?.days ?? 0,
            formatter: (value) => value + "日",
          }}
          sub={{
            value: latestStreakIndex + 1,
            formatter: (value) =>
              (isStreakOngoing ? "現在" : "前回") + value + "位",
            color: () => (isStreakOngoing ? "green" : "red"),
          }}
          description={`${latestStreak?.startDate}\u00A0\u200B〜\u00A0${latestStreak?.endDate}`}
          icon={<TrendUpIcon />}
          isLoading={!latestStreak}
        />
      </Grid.Col>

      <Grid.Col span={{ base: 6, md: 3 }}>
        <SummaryCard
          label="最長連続成功"
          metric={{
            value: longestStreak?.days ?? 0,
            formatter: (value) => value + "日",
          }}
          description={`${longestStreak?.startDate}\u00A0\u200B〜\u00A0${longestStreak?.endDate}`}
          icon={<TrophyIcon />}
          isLoading={!longestStreak}
        />
      </Grid.Col>
    </Grid>
  );
}
