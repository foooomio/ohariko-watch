import { time, type EChartsOption } from "echarts";
import ReactEChartsCore from "echarts-for-react/esm/core";
import { echarts } from "@/lib/echarts";
import { hour } from "~/shared/lib/date";
import { buildScatterData } from "./buildScatterData";
import { buildGaussianSmoothData } from "./buildGaussianSmoothData";
import { useSuspenseQueries } from "@tanstack/react-query";
import { postsOptions } from "@/queries/stats";

const noPostMarker =
  '<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:#ccc;"></span>';

interface Props {
  color: {
    success: string;
    failure: string;
    trendLine: string;
  };
}

export default function PostingTimeScatterChart({ color }: Props) {
  const [
    {
      data: { successData, failureData },
    },
    { data: gaussianSmoothData },
    { data: startValue },
  ] = useSuspenseQueries({
    queries: [
      {
        queryKey: postsOptions.queryKey.concat("buildScatterData"),
        queryFn: async ({ client }) => {
          const data = await client.ensureQueryData(postsOptions);
          return buildScatterData(data.payload);
        },
      },
      {
        queryKey: postsOptions.queryKey.concat("buildGaussianSmoothData"),
        queryFn: async ({ client }) => {
          const data = await client.ensureQueryData(postsOptions);
          return buildGaussianSmoothData(data.payload, 7);
        },
      },
      {
        queryKey: postsOptions.queryKey.concat("scatterChart", "startValue"),
        queryFn: async ({ client }) => {
          const data = await client.ensureQueryData(postsOptions);
          return (
            data.payload.at(-180)?.date.toZonedDateTime("UTC")
              .epochMilliseconds ?? 0
          );
        },
      },
    ],
  });

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
      min: hour(2).total("millisecond"),
      max: hour(16).total("millisecond"),
      interval: hour(2).total("millisecond"),
      axisLabel: {
        formatter: (value) => time.format(value, "{HH}:{mm}", true),
      },
      inverse: true,
    },
    dataZoom: [
      {
        type: "slider",
        xAxisIndex: 0,
        startValue,
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
          data: [{ yAxis: hour(12).total("millisecond") }],
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
