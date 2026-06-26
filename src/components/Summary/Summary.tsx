import { Grid } from "@mantine/core";
import { SummaryCard } from "./SummaryCard";
import { buildSummaryData } from "./buildSummaryData";
import { HOUR, MINUTE } from "~/shared/lib/date";
import {
  ClockIcon,
  SunIcon,
  TrendUpIcon,
  TrophyIcon,
} from "@phosphor-icons/react";
import type { DailyRecord, Streak } from "~/shared/types/stats";
import type { SortedBy } from "~/shared/types/sortedBy";

function timeOfDayToHmm(timeOfDay: number): string {
  const h = Math.floor(timeOfDay / HOUR);
  const m = Math.floor((timeOfDay % HOUR) / MINUTE);
  return h + ":" + String(m).padStart(2, "0");
}

interface Props {
  records: SortedBy<DailyRecord, "date", "asc">;
  streaks: SortedBy<Streak, "startDate", "asc">;
  sortedStreaks: SortedBy<Streak, "days", "desc">;
}

export function Summary({ records, streaks, sortedStreaks }: Props) {
  const recent = buildSummaryData(records.slice(-30));
  const previous = buildSummaryData(records.slice(-60, -30));

  const latestStreak = streaks.at(-1);
  const longestStreak = sortedStreaks.at(0);

  const isStreakOngoing = latestStreak?.endDate === records.at(-1)?.date;
  const latestStreakIndex = sortedStreaks.findIndex(
    (streak) => streak.startDate === latestStreak?.startDate,
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
                minimumFractionDigits: 1,
                maximumFractionDigits: 1,
              }),
          }}
          sub={{
            value: recent.successRate - previous.successRate,
            formatter: (value) =>
              (value * 100).toLocaleString("ja", {
                minimumFractionDigits: 1,
                maximumFractionDigits: 1,
                signDisplay: "always",
              }) + "pt",
            color: (value) => (value < 0 ? "red" : "green"),
          }}
          description="直近30日間"
          icon={<SunIcon />}
          isLoading={records.length === 0}
        />
      </Grid.Col>

      <Grid.Col span={{ base: 6, md: 3 }}>
        <SummaryCard
          label="平均投稿時刻"
          metric={{
            value: recent.averageTime,
            formatter: (value) => timeOfDayToHmm(value),
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
          isLoading={records.length === 0}
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
