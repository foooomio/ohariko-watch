import { useSuspenseQuery } from "@tanstack/react-query";
import { time, type EChartsOption } from "echarts";
import ReactEChartsCore from "echarts-for-react/esm/core";

import { echarts } from "@/lib/echarts";
import { postsOptions } from "@/queries/stats";
import { hour } from "~/shared/lib/date";

import { buildMonthlyStats } from "./buildMonthlyStats";

interface Props {
  color: {
    successRate: string;
    failureRate: string;
    averageTime: string;
  };
}

export default function MonthlyStatsChart({ color }: Props) {
  const { data } = useSuspenseQuery({
    queryKey: postsOptions.queryKey.concat("buildMonthlyStats"),
    queryFn: async ({ client }) => {
      const data = await client.ensureQueryData(postsOptions);
      return buildMonthlyStats(data.payload);
    },
  });

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
      data: data.map(({ yearMonth }) => yearMonth),
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
        min: hour(4).total("millisecond"),
        max: hour(14).total("millisecond"),
        interval: hour(2).total("millisecond"),
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
        data: data.map(({ successRate }) => successRate),
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
        data: data.map(({ averageTime }) => averageTime),
        itemStyle: { color: color.averageTime },
        tooltip: {
          valueFormatter: (value) => time.format(value, "{HH}:{mm}", true),
        },
      },
    ],
  };

  return <ReactEChartsCore echarts={echarts} option={option} opts={{ locale: "JA" }} />;
}
