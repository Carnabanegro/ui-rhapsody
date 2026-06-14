/**
 * Chart utility types — no ApexCharts type re-exports leak here.
 * Consumers who need input types should import from './chart-inputs'.
 */

/** Structural type for the runtime ApexCharts methods we actually call. */
export interface ApexChartsRuntime {
  resize(): void;
  updateOptions(
    options: Record<string, unknown>,
    redrawPaths?: boolean,
    animate?: boolean,
    updateSyncedCharts?: boolean,
  ): void;
  destroy(): void;
}

/** Event emitted when ApexCharts chart instance is ready */
export interface ChartReadyEvent {
  chartObj: ApexChartsRuntime;
}

/** Chart type string literal union */
export type ChartType =
  | 'line'
  | 'area'
  | 'bar'
  | 'scatter'
  | 'bubble'
  | 'rangeArea'
  | 'rangeBar'
  | 'candlestick'
  | 'boxPlot'
  | 'pie'
  | 'donut'
  | 'polarArea'
  | 'radialBar'
  | 'radar'
  | 'heatmap'
  | 'treemap';