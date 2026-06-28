import type { EChartsOption } from "echarts";
import ReactEChartsCore from "echarts-for-react/esm/core";
import { echarts } from "@/lib/echarts";
import type { Post } from "~/shared/types/stats";
import { buildHistogramData } from "./buildHistogramData";

interface Props {
  posts: readonly Post[];
  color: {
    success: string;
    failure: string;
  };
}

export function PostingTimeHistogramChart({ posts, color }: Props) {
  const histogram = buildHistogramData(posts);

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
    },
    xAxis: {
      type: "category",
      data: Array.from({ length: 24 }, (_, h) => h + "時台"),
      min: 0,
      max: 16,
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
        tooltip: {
          valueFormatter: (value) => value + "回",
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
