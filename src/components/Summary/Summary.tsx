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
  const { data: postsJson } = useQuery(postsOptions);
  const { data: streaksJson } = useQuery(streaksOptions);

  const { data: recent } = useQuery({
    queryKey: postsOptions.queryKey.concat("buildSummaryData", "recent"),
    queryFn: async ({ client }) => {
      const data = await client.ensureQueryData(postsOptions);
      return buildSummaryData(data.payload.slice(-30));
    },
  });

  const { data: previous } = useQuery({
    queryKey: postsOptions.queryKey.concat("buildSummaryData", "previous"),
    queryFn: async ({ client }) => {
      const data = await client.ensureQueryData(postsOptions);
      return buildSummaryData(data.payload.slice(-60, -30));
    },
  });

  const posts = postsJson?.payload ?? [];
  const streaks = streaksJson?.payload ?? [];

  const latestStreak = streaks.toSorted(byStartDateDesc).at(0);
  const longestStreak = streaks.at(0);

  const latestPost = posts.at(-1);
  const isStreakOngoing =
    latestStreak && latestPost && latestStreak.endDate.equals(latestPost.date);

  const successRate =
    (recent && previous && recent.successRate - previous.successRate) || 0;
  const averageTime =
    (recent && previous && recent.averageTime - previous.averageTime) || 0;

  return (
    <Grid>
      <Grid.Col span={{ base: 6, md: 3 }}>
        <SummaryCard
          label="おはりこ成功率"
          metric={{
            value: recent?.successRate ?? 0,
            formatter: (value) =>
              value.toLocaleString("ja", {
                style: "percent",
                maximumFractionDigits: 1,
              }),
          }}
          sub={{
            value: successRate,
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
            value: recent?.averageTime ?? 0,
            formatter: (value) =>
              toPlainTime(Math.round(value)).toString({
                smallestUnit: "minute",
              }),
          }}
          sub={{
            value: averageTime,
            formatter: (value) =>
              (value / minute().total("millisecond")).toLocaleString("ja", {
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
          description={`${latestStreak?.startDate}\u00A0\u200B〜\u00A0${latestStreak?.endDate}`}
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
          description={`${longestStreak?.startDate}\u00A0\u200B〜\u00A0${longestStreak?.endDate}`}
          icon={<TrophyIcon />}
          isLoading={!longestStreak}
        />
      </Grid.Col>
    </Grid>
  );
}
