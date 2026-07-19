import { Grid } from "@mantine/core";
import { SummaryCard } from "./SummaryCard";
import { buildSummaryData } from "./buildSummaryData";
import { minute, toPlainTime } from "~/shared/lib/date";
import {
  ClockIcon,
  SunIcon,
  TrendUpIcon,
  TrophyIcon,
} from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import { postsOptions, streaksOptions } from "@/queries/stats";
import { byStartDateDesc } from "~/shared/lib/comparators/streaks";

export function Summary() {
  const { data: posts } = useQuery(postsOptions);
  const { data: streaks } = useQuery(streaksOptions);

  const recent = buildSummaryData(posts.slice(-30));
  const previous = buildSummaryData(posts.slice(-60, -30));

  const latestStreak = streaks.toSorted(byStartDateDesc).at(0);
  const longestStreak = streaks.at(0);

  const latestPost = posts.at(-1);
  const isStreakOngoing =
    latestStreak && latestPost && latestStreak.endDate.equals(latestPost.date);

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
            formatter: (value) => {
              const m = Math.abs(value / minute().total("millisecond"));
              return `${m.toFixed()}分${value < 0 ? "早" : "遅"}`;
            },
            color: (value) => (value < 0 ? "green" : "red"),
          }}
          description="直近30日間"
          icon={<ClockIcon />}
          isLoading={posts.length === 0}
        />
      </Grid.Col>

      <Grid.Col span={{ base: 6, md: 3 }}>
        <SummaryCard
          label={(isStreakOngoing ? "現在" : "前回") + "連続記録"}
          metric={{
            value: latestStreak?.days ?? 0,
            formatter: (value) => value + "日",
          }}
          sub={{
            value: latestStreak?.rank ?? 0,
            formatter: (value) =>
              (isStreakOngoing ? "現在" : "前回") + value + "位",
            color: () => (isStreakOngoing ? "green" : "red"),
          }}
          description={`${latestStreak?.startDate} - ${latestStreak?.endDate}`}
          icon={<TrendUpIcon />}
          isLoading={!latestStreak}
        />
      </Grid.Col>

      <Grid.Col span={{ base: 6, md: 3 }}>
        <SummaryCard
          label="最長連続記録"
          metric={{
            value: longestStreak?.days ?? 0,
            formatter: (value) => value + "日",
          }}
          description={`${longestStreak?.startDate} - ${longestStreak?.endDate}`}
          icon={<TrophyIcon />}
          isLoading={!longestStreak}
        />
      </Grid.Col>
    </Grid>
  );
}
