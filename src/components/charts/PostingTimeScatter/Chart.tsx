import { time, type EChartsOption } from "echarts";
import ReactEChartsCore from "echarts-for-react/esm/core";
import { echarts } from "@/lib/echarts";
import { color } from "@/lib/color";
import { HOUR } from "~/shared/lib/date";
import type { DailyRecord } from "~/shared/types/stats";
import { buildScatterData } from "./buildScatterData";

interface Props {
  records: DailyRecord[];
}

export function PostingTimeScatterChart({ records }: Props) {
  const { successData, failureData, startValue } = buildScatterData(
    records,
    180,
  );

  const option: EChartsOption = {
    legend: {
      formatter: (name) =>
        name === "成功" ? "成功（〜11:59）" : "失敗（12:00〜）",
    },
    tooltip: {
      trigger: "axis",
      formatter: ([params]: any) => {
        const dateStr = time.format(params.value[0], "{yyyy}-{MM}-{dd}", true);
        const timeStr = time.format(params.value[1], "{HH}:{mm}", true);
        return [
          `${dateStr} ${timeStr}`,
          `${params.marker}${params.seriesName}`,
        ].join("<br />");
      },
    },
    xAxis: {
      type: "time",
      axisLine: { show: false },
      axisTick: { show: false },
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 20 * HOUR,
      interval: 4 * HOUR,
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
        labelFormatter: (value) => time.format(value, "{yyyy}-{MM}-{dd}", true),
        showDataShadow: false,
      },
      {
        type: "inside",
        xAxisIndex: 0,
        zoomOnMouseWheel: false,
        moveOnMouseWheel: true,
        moveOnMouseMove: true,
      },
    ],
    series: [
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
