import type { EChartsOption } from "echarts";
import ReactEChartsCore from "echarts-for-react/esm/core";
import { echarts } from "@/lib/echarts";
import type { DailyRecord } from "~/shared/types/stats";
import { buildHistogramData } from "./buildHistogramData";

interface Props {
  records: DailyRecord[];
}

export function PostingTimeHistogramChart({ records }: Props) {
  const histogram = buildHistogramData(records);

  const option: EChartsOption = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
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
        data: histogram,
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
