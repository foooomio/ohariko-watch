import { useMantineTheme } from "@mantine/core";
import { OverviewSection } from "./OverviewSection";
import { LongestStreaks } from "./LongestStreaks";
import { ChartCard } from "./ChartCard";
import { PostingTimeScatter } from "./charts/PostingTimeScatter";
import { PostingTimeHistogram } from "./charts/PostingTimeHistogram";
import { MonthlyStats } from "./charts/MonthlyStats";
import { useDailyRecords } from "@/hooks/useDailyRecords";
import { useStreaks } from "@/hooks/useStreaks";

export function Dashboard() {
  const { colors } = useMantineTheme();

  const { data: recordsJson } = useDailyRecords();
  const { data: streaksJson } = useStreaks();

  if (!recordsJson || !streaksJson) {
    return null;
  }

  return (
    <>
      <OverviewSection />

      <ChartCard title="日別投稿時刻">
        <PostingTimeScatter
          records={recordsJson.payload}
          color={{
            success: colors.green[5],
            failure: colors.red[5],
          }}
        />
      </ChartCard>

      <ChartCard title="投稿時刻分布">
        <PostingTimeHistogram
          records={recordsJson.payload}
          color={{
            success: colors.green[5],
            failure: colors.red[5],
          }}
        />
      </ChartCard>

      <ChartCard title="月別成功率・平均投稿時刻">
        <MonthlyStats
          records={recordsJson.payload}
          color={{
            successRate: colors.green[5],
            averageTime: colors.blue[6],
          }}
        />
      </ChartCard>

      <ChartCard title="連続成功ランキング">
        <LongestStreaks streaks={streaksJson.payload} />
      </ChartCard>
    </>
  );
}
