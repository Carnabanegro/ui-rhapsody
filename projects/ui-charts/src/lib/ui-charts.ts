// UI Charts — Barrel Exports
// Each chart component is standalone and can be imported individually.

import { Type, EnvironmentProviders, importProvidersFrom, provideZonelessChangeDetection } from '@angular/core';
import { UiLineChartComponent } from './chart-line/chart-line.component';
import { UiAreaChartComponent } from './chart-area/chart-area.component';
import { UiBarChartComponent } from './chart-bar/chart-bar.component';
import { UiScatterChartComponent } from './chart-scatter/chart-scatter.component';
import { UiBubbleChartComponent } from './chart-bubble/chart-bubble.component';
import { UiRangeAreaChartComponent } from './chart-range-area/chart-range-area.component';
import { UiRangeBarChartComponent } from './chart-range-bar/chart-range-bar.component';
import { UiCandlestickChartComponent } from './chart-candlestick/chart-candlestick.component';
import { UiBoxPlotChartComponent } from './chart-box-plot/chart-box-plot.component';
import { UiPieChartComponent } from './chart-pie/chart-pie.component';
import { UiDonutChartComponent } from './chart-donut/chart-donut.component';
import { UiPolarAreaChartComponent } from './chart-polar-area/chart-polar-area.component';
import { UiRadialBarChartComponent } from './chart-radial-bar/chart-radial-bar.component';
import { UiRadarChartComponent } from './chart-radar/chart-radar.component';
import { UiHeatmapChartComponent } from './chart-heatmap/chart-heatmap.component';
import { UiTreemapChartComponent } from './chart-treemap/chart-treemap.component';

export { UiLineChartComponent } from './chart-line/chart-line.component';
export { UiAreaChartComponent } from './chart-area/chart-area.component';
export { UiBarChartComponent } from './chart-bar/chart-bar.component';
export { UiScatterChartComponent } from './chart-scatter/chart-scatter.component';
export { UiBubbleChartComponent } from './chart-bubble/chart-bubble.component';
export { UiRangeAreaChartComponent } from './chart-range-area/chart-range-area.component';
export { UiRangeBarChartComponent } from './chart-range-bar/chart-range-bar.component';
export { UiCandlestickChartComponent } from './chart-candlestick/chart-candlestick.component';
export { UiBoxPlotChartComponent } from './chart-box-plot/chart-box-plot.component';
export { UiPieChartComponent } from './chart-pie/chart-pie.component';
export { UiDonutChartComponent } from './chart-donut/chart-donut.component';
export { UiPolarAreaChartComponent } from './chart-polar-area/chart-polar-area.component';
export { UiRadialBarChartComponent } from './chart-radial-bar/chart-radial-bar.component';
export { UiRadarChartComponent } from './chart-radar/chart-radar.component';
export { UiHeatmapChartComponent } from './chart-heatmap/chart-heatmap.component';
export { UiTreemapChartComponent } from './chart-treemap/chart-treemap.component';

export type { ChartReadyEvent, ChartType, ApexChartsRuntime } from './chart-types';
export type {
  ApexChart,
  ApexAxisChartSeries,
  ApexNonAxisChartSeries,
  ApexXAxis,
  ApexYAxis,
  ApexStroke,
  ApexFill,
  ApexDataLabels,
  ApexTooltip,
  ApexLegend,
  ApexPlotOptions,
  ApexGrid,
  ApexTheme,
  ApexTitleSubtitle,
  ApexAnnotations,
  ApexMarkers,
  ApexResponsive,
  ApexStates,
  ApexNoData,
  ApexForecastDataPoints,
} from './chart-inputs';

export const UI_CHARTS_COMPONENTS: readonly Type<unknown>[] = [
  UiLineChartComponent,
  UiAreaChartComponent,
  UiBarChartComponent,
  UiScatterChartComponent,
  UiBubbleChartComponent,
  UiRangeAreaChartComponent,
  UiRangeBarChartComponent,
  UiCandlestickChartComponent,
  UiBoxPlotChartComponent,
  UiPieChartComponent,
  UiDonutChartComponent,
  UiPolarAreaChartComponent,
  UiRadialBarChartComponent,
  UiRadarChartComponent,
  UiHeatmapChartComponent,
  UiTreemapChartComponent,
];

/**
 * Provides chart UI components and zoneless change detection.
 * Use in `bootstrapApplication` providers:
 * ```ts
 * bootstrapApplication(App, { providers: [...provideUiCharts()] });
 * ```
 */
export function provideUiCharts(): EnvironmentProviders[] {
  return [
    provideZonelessChangeDetection(),
    importProvidersFrom(...UI_CHARTS_COMPONENTS),
  ];
}