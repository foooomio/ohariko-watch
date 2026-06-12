import type { EChartsOption } from "echarts";
import ReactEChartsCore from "echarts-for-react/esm/core";
import { echarts } from "@/lib/echarts";
import type { DailyRecord } from "~/shared/types/stats";
import { buildHistogramData } from "./buildHistogramData";

interface Props {
  records: DailyRecord[];
  color: {
    success: string;
    failure: string;
  };
}

export function PostingTimeHistogram({ records, color }: Props) {
  const histogram = buildHistogramData(records);

  const option: EChartsOption = {
    grid: {
      top: 0,
      right: 8,
      bottom: 0,
      left: 8,
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      valueFormatter: (value) => value + "回",
    },
    xAxis: {
      type: "category",
      data: Array.from({ length: 24 }, (_, h) => h + "時台"),
    },
    yAxis: {
      type: "value",
      minInterval: 1,
    },
    series: [
      {
        type: "bar",
        data: histogram.map((value, index) => ({
          value,
          itemStyle: { color: index < 12 ? color.success : color.failure },
        })),
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
