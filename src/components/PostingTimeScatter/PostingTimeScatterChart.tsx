import { time, type EChartsOption } from "echarts";
import ReactEChartsCore from "echarts-for-react/esm/core";
import { echarts } from "@/lib/echarts";
import { HOUR } from "~/shared/lib/date";
import { buildScatterData } from "./buildScatterData";
import { buildGaussianSmoothData } from "./buildGaussianSmoothData";
import type { SortedBy } from "~/shared/types/sortedBy";
import type { Post } from "~/shared/types/stats";

const noPostMarker =
  '<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:#ccc;"></span>';

interface Props {
  posts: SortedBy<Post, "date", "asc">;
  color: {
    success: string;
    failure: string;
    trendLine: string;
  };
}

export function PostingTimeScatterChart({ posts, color }: Props) {
  const { successData, failureData } = buildScatterData(posts);

  const gaussianSmoothData = buildGaussianSmoothData(posts, 7);

  const option: EChartsOption = {
    grid: {
      top: 0,
      right: 8,
      bottom: 64,
      left: 48,
    },
    tooltip: {
      trigger: "axis",
      formatter: ([trend, point]: any) => {
        const lines: string[] = [];
        lines.push(time.format(trend.value[0], "{yyyy}-{MM}-{dd}", true));
        if (point) {
          const text = time.format(point.value[1], "{HH}:{mm}", true);
          const html = `<span style="color:#6d6e73;font-weight:900">${text}</span>`;
          lines.push(`${point.marker}${point.seriesName} ${html}`);
        } else {
          lines.push(`${noPostMarker}投稿なし`);
        }
        return lines.join("<br />");
      },
    },
    xAxis: {
      type: "time",
      axisLine: { show: false },
      axisTick: { show: false },
    },
    yAxis: {
      type: "value",
      min: 2 * HOUR,
      max: 16 * HOUR,
      interval: 2 * HOUR,
      axisLabel: {
        formatter: (value) => time.format(value, "{HH}:{mm}", true),
      },
      inverse: true,
    },
    dataZoom: [
      {
        type: "slider",
        xAxisIndex: 0,
        startValue: posts.at(-180)?.date.toZonedDateTime("UTC")
          .epochMilliseconds,
        showDetail: false,
        bottom: 8,
        brushSelect: false,
      },
      {
        type: "inside",
        xAxisIndex: 0,
        zoomOnMouseWheel: false,
        moveOnMouseWheel: true,
        moveOnMouseMove: false,
        cursorGrab: "default",
        cursorGrabbing: "default",
      },
    ],
    series: [
      {
        name: "投稿時刻の傾向",
        type: "line",
        symbol: "none",
        data: gaussianSmoothData,
        itemStyle: { color: color.trendLine },
      },
      {
        name: "成功",
        type: "scatter",
        data: successData,
        itemStyle: { color: color.success },
      },
      {
        name: "失敗",
        type: "scatter",
        data: failureData,
        itemStyle: { color: color.failure },
        markLine: {
          silent: true,
          symbol: "none",
          lineStyle: { color: color.failure, type: "dashed", width: 2 },
          label: { show: false },
          data: [{ yAxis: 12 * HOUR }],
        },
      },
    ],
    useUTC: true,
  };

  const handleClick = (params: any) => {
    window.open(params.data.extra.url, "_blank");
  };

  return (
    <ReactEChartsCore
      echarts={echarts}
      option={option}
      onEvents={{ click: handleClick }}
      opts={{ locale: "JA" }}
    />
  );
}
