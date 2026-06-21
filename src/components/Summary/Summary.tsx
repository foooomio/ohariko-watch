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

function timeOfDayToHmm(timeOfDay: number): string {
  const h = Math.floor(timeOfDay / HOUR);
  const m = Math.floor((timeOfDay % HOUR) / MINUTE);
  return h + ":" + String(m).padStart(2, "0");
}

interface Props {
  records: DailyRecord[];
  currentStreak: Streak | undefined;
  longestStreak: Streak | undefined;
}

export function Summary({ records, currentStreak, longestStreak }: Props) {
  const recent = buildSummaryData(records.slice(-30));
  const previous = buildSummaryData(records.slice(-60, -30));

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
          diff={{
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
          diff={{
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
          label="現在連続成功"
          metric={{
            value: currentStreak?.days ?? 0,
            formatter: (value) => value + "日",
          }}
          description={`${currentStreak?.startDate} 〜 ${currentStreak?.endDate}`}
          icon={<TrendUpIcon />}
          isLoading={!currentStreak}
        />
      </Grid.Col>

      <Grid.Col span={{ base: 6, md: 3 }}>
        <SummaryCard
          label="最長連続成功"
          metric={{
            value: longestStreak?.days ?? 0,
            formatter: (value) => value + "日",
          }}
          description={`${longestStreak?.startDate} 〜 ${longestStreak?.endDate}`}
          icon={<TrophyIcon />}
          isLoading={!longestStreak}
        />
      </Grid.Col>
    </Grid>
  );
}
