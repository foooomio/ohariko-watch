import { useMantineTheme } from "@mantine/core";
import { OverviewSection } from "./OverviewSection";
import { ChartCard } from "./ChartCard";
import { PostingTimeScatter } from "./charts/PostingTimeScatter";
import { PostingTimeHistogram } from "./charts/PostingTimeHistogram";
import { MonthlyStats } from "./charts/MonthlyStats";
import { useDailyRecords } from "@/hooks/useDailyRecords";

export function Dashboard() {
  const { colors } = useMantineTheme();

  const { data } = useDailyRecords();

  if (!data) {
    return null;
  }

  return (
    <>
      <OverviewSection />

      <ChartCard title="日別投稿時刻">
        <PostingTimeScatter
          records={data.payload}
          color={{
            success: colors.green[5],
            failure: colors.red[5],
          }}
        />
      </ChartCard>

      <ChartCard title="投稿時刻分布">
        <PostingTimeHistogram
          records={data.payload}
          color={{
            success: colors.green[5],
            failure: colors.red[5],
          }}
        />
      </ChartCard>

      <ChartCard title="月別成功率・平均投稿時刻">
        <MonthlyStats
          records={data.payload}
          color={{
            successRate: colors.green[5],
            averageTime: colors.blue[6],
          }}
        />
      </ChartCard>
    </>
  );
}
