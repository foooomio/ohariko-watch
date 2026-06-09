import { time, type EChartsOption } from "echarts";
import ReactEChartsCore from "echarts-for-react/esm/core";
import { echarts } from "@/lib/echarts";
import { color } from "@/lib/color";
import type { DailyRecord } from "~/shared/types/stats";
import { HOUR } from "~/shared/lib/date";
import { buildMonthlyStats } from "./buildMonthlyStats";

interface Props {
  records: DailyRecord[];
}

export function MonthlyTrend({ records }: Props) {
  const stats = buildMonthlyStats(records);

  const option: EChartsOption = {
    legend: {},
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      valueFormatter: (value) => {
        if (typeof value !== "number") {
          return "";
        } else if (value > 1) {
          return time.format(value, "{HH}:{mm}", true);
        } else {
          return Math.round(value * 100) + "%";
        }
      },
    },
    xAxis: {
      type: "category",
      data: stats.map(({ yearMonth }) => yearMonth),
    },
    yAxis: [
      {
        type: "value",
        min: 0,
        max: 1,
        interval: 0.2,
        axisLabel: {
          formatter: (value) => Math.round(value * 100) + "%",
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
        data: stats.map(({ successRate }) => successRate),
        itemStyle: { color: color.success },
      },
      {
        name: "平均投稿時刻",
        type: "line",
        smooth: false,
        yAxisIndex: 1,
        data: stats.map(({ averageTime }) => averageTime),
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
