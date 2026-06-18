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
  currentStreak: Streak;
  longestStreak: Streak;
}

export function Summary({ records, currentStreak, longestStreak }: Props) {
  const { successRate, averageTime } = buildSummaryData(records);

  const successRateStr = (successRate * 100).toFixed(1) + " %";
  const averageTimeStr = timeOfDayToHmm(averageTime);

  return (
    <Grid>
      <Grid.Col span={{ base: 6, md: 3 }}>
        <SummaryCard
          label="おはりこ成功率"
          metric={successRateStr}
          description="直近30日間"
          icon={<SunIcon />}
        />
      </Grid.Col>

      <Grid.Col span={{ base: 6, md: 3 }}>
        <SummaryCard
          label="平均投稿時刻"
          metric={averageTimeStr}
          description="直近30日間"
          icon={<ClockIcon />}
        />
      </Grid.Col>

      <Grid.Col span={{ base: 6, md: 3 }}>
        <SummaryCard
          label="現在連続成功"
          metric={currentStreak.days + " 日"}
          description={currentStreak.startDate + " 〜 " + currentStreak.endDate}
          icon={<TrendUpIcon />}
        />
      </Grid.Col>

      <Grid.Col span={{ base: 6, md: 3 }}>
        <SummaryCard
          label="最長連続成功"
          metric={longestStreak.days + " 日"}
          description={longestStreak.startDate + " 〜 " + longestStreak.endDate}
          icon={<TrophyIcon />}
        />
      </Grid.Col>
    </Grid>
  );
}
