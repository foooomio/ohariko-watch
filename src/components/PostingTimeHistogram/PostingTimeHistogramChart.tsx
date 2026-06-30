import type { EChartsOption } from "echarts";
import ReactEChartsCore from "echarts-for-react/esm/core";
import { echarts } from "@/lib/echarts";
import { buildHistogramData } from "./buildHistogramData";
import { useSuspenseQuery } from "@tanstack/react-query";
import { postsOptions } from "@/queries/stats";

interface Props {
  color: {
    success: string;
    failure: string;
  };
}

export default function PostingTimeHistogramChart({ color }: Props) {
  const { data } = useSuspenseQuery(postsOptions());
  const posts = data.payload;

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
