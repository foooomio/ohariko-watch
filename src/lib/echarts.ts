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

// @ts-ignore
import langJA from "echarts/lib/i18n/langJA";

echarts.registerLocale("JA", langJA);

export { echarts };
