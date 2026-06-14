/**
 * Narrow type-only re-exports from ng-apexcharts.
 *
 * Components import their input types from this module instead of
 * directly from 'ng-apexcharts'. This keeps the full ApexCharts surface
 * out of the public barrel while still providing consumer-facing types.
 */
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
} from 'ng-apexcharts';