import { Grid } from "@mantine/core";
import { SummaryCard } from "./SummaryCard";
import { useDailyRecords } from "@/hooks/useDailyRecords";
import { useStreaks } from "@/hooks/useStreaks";
import { HOUR, isBeforeNoon, MINUTE } from "~/shared/lib/date";
import {
  ClockIcon,
  SunIcon,
  TrendUpIcon,
  TrophyIcon,
} from "@phosphor-icons/react";

export function OverviewSection() {
  const { data: recordsJson } = useDailyRecords();
  const { data: streaksJson } = useStreaks();

  if (!recordsJson || !streaksJson) {
    return null;
  }

  const records = recordsJson.payload;
  const streaks = streaksJson.payload;

  let successCount = 0;
  let failureCount = 0;
  let totalTime = 0;

  for (const { timeOfDay } of records.slice(-30)) {
    if (!timeOfDay) {
      continue;
    }

    if (isBeforeNoon(timeOfDay)) {
      successCount++;
    } else {
      failureCount++;
    }

    totalTime += timeOfDay;
  }

  const postCount = successCount + failureCount;
  const successRate = successCount / postCount;
  const averageTime = totalTime / postCount;

  const successRateStr = (successRate * 100).toFixed(1) + " %";
  const averageTimeStr = (() => {
    const h = Math.floor(averageTime / HOUR);
    const m = Math.floor((averageTime % HOUR) / MINUTE);
    return h + ":" + String(m).padStart(2, "0");
  })();

  const currentStreak = streaks.at(-1)!;
  const longestStreak = streaks.toSorted((a, b) => b.days - a.days).at(0)!;

  return (
    <Grid>
      <Grid.Col span={{ base: 6, md: 3 }}>
        <SummaryCard
          label="成功率"
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
