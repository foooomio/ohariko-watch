import { time, type EChartsOption } from "echarts";
import ReactEChartsCore from "echarts-for-react/esm/core";
import { echarts } from "@/lib/echarts";
import type { DailyRecord } from "~/shared/types/stats";
import { HOUR } from "~/shared/lib/date";
import { buildWeekdayStats } from "./buildWeekdayStats";

interface Props {
  records: readonly DailyRecord[];
  color: {
    successRate: string;
    failureRate: string;
    averageTime: string;
  };
}

export function WeekdayStatsChart({ records, color }: Props) {
  const stats = buildWeekdayStats(records);

  const percentFormatter = new Intl.NumberFormat("ja", {
    style: "percent",
    maximumFractionDigits: 1,
  });

  const option: EChartsOption = {
    grid: {
      top: 0,
      right: 48,
      bottom: 48,
      left: 8,
    },
    legend: {
      bottom: 0,
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    xAxis: {
      type: "category",
      data: ["日", "月", "火", "水", "木", "金", "土"],
    },
    yAxis: [
      {
        type: "value",
        min: 0,
        max: 1,
        interval: 0.2,
        axisLabel: {
          formatter: (value) => percentFormatter.format(value),
        },
      },
      {
        type: "value",
        min: 4 * HOUR,
        max: 14 * HOUR,
        interval: 2 * HOUR,
        axisLabel: {
          formatter: (value) => time.format(value, "{HH}:{mm}", true),
        },
        inverse: true,
      },
    ],
    series: [
      {
        name: "成功率",
        type: "bar",
        yAxisIndex: 0,
        showBackground: true,
        backgroundStyle: { color: color.failureRate },
        data: stats.map(({ successRate }) => successRate),
        itemStyle: { color: color.successRate },
        tooltip: {
          valueFormatter: (value) =>
            typeof value === "number" ? percentFormatter.format(value) : "",
        },
      },
      {
        name: "平均投稿時刻",
        type: "line",
        smooth: false,
        yAxisIndex: 1,
        data: stats.map(({ averageTime }) => averageTime),
        itemStyle: { color: color.averageTime },
        tooltip: {
          valueFormatter: (value) => time.format(value, "{HH}:{mm}", true),
        },
      },
    ],
  };

  return (
    <ReactEChartsCore
      echarts={echarts}
      option={option}
      opts={{ locale: "JA" }}
    />
  );
}
