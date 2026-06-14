/**
 * Default theme configuration using CSS Custom Properties.
 * Each chart component reads these via ElementRef and maps them to ApexCharts options.
 *
 * Consuming apps override these via:
 *   :root { --ui-charts-color-primary: #6750a4; }  (global)
 *   ui-line-chart { --ui-charts-color-primary: #ff5722; }  (per-instance)
 */
export const CHART_CSS_VARS = {
  // Primary palette (up to 7 series colors)
  colors: [
    'var(--ui-charts-color-primary, #6750a4)',
    'var(--ui-charts-color-secondary, #e8def8)',
    'var(--ui-charts-color-accent, #625b71)',
    'var(--ui-charts-color-success, #4caf50)',
    'var(--ui-charts-color-warn, #ffb74d)',
    'var(--ui-charts-color-info, #29b6f6)',
    'var(--ui-charts-color-danger, #ef5350)',
  ] as string[],
  // Typography
  fontFamily: "var(--ui-charts-font-family, 'Roboto', sans-serif)",
  fontSize: 'var(--ui-charts-font-size, 13px)',
  // Chart background
  background: 'var(--ui-charts-background, transparent)',
  // Grid
  gridBorderColor: 'var(--ui-charts-grid-border-color, #e0e0e0)',
  // Tooltip
  tooltipBackground: 'var(--ui-charts-tooltip-background, #263238)',
  tooltipColor: 'var(--ui-charts-tooltip-color, #ffffff)',
} as const;

/**
 * Maps CSS custom property tokens to ApexCharts theme options.
 * Called by each chart component to build the `theme` and `chart` defaults.
 */
export function buildChartDefaults() {
  return {
    chart: {
      fontFamily: CHART_CSS_VARS.fontFamily,
      background: CHART_CSS_VARS.background,
      toolbar: { show: false },
      animations: { enabled: true, speed: 400 },
    },
    theme: {
      mode: 'light' as const,
      palette: 'palette1',
    },
    grid: {
      borderColor: CHART_CSS_VARS.gridBorderColor,
      strokeDashArray: 3,
      xaxis: { lines: { show: false } },
    },
    tooltip: {
      theme: 'dark' as const,
      style: { fontSize: CHART_CSS_VARS.fontSize },
    },
    colors: CHART_CSS_VARS.colors,
  };
}