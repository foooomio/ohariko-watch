import * as echarts from "echarts/core";

import { LineChart, BarChart, ScatterChart } from "echarts/charts";

import {
  LegendPlainComponent,
  GridSimpleComponent,
  DataZoomComponent,
  TooltipComponent,
  MarkLineComponent,
} from "echarts/components";

import { CanvasRenderer } from "echarts/renderers";

// @ts-ignore
import "echarts/i18n/langJA";

echarts.use([
  LineChart,
  BarChart,
  ScatterChart,
  LegendPlainComponent,
  GridSimpleComponent,
  DataZoomComponent,
  TooltipComponent,
  MarkLineComponent,
  CanvasRenderer,
]);

export { echarts };
