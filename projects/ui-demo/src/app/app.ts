import { Component, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { UiButtonComponent, UiGridBoardComponent } from '@ui-rhapsody/core';
import type { GridItemConfig, ButtonVariant, ButtonColor, ButtonSize } from '@ui-rhapsody/core';
import {
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
} from '@ui-rhapsody/charts';
import {
  lineSeries, lineXaxis,
  areaSeries, areaXaxis,
  barSeries, barXaxis,
  scatterSeries,
  bubbleSeries,
  rangeAreaSeries,
  rangeBarSeries,
  candlestickSeries, candlestickXaxis,
  boxPlotSeries,
  pieSeries, pieLabels,
  donutSeries, donutLabels,
  polarAreaSeries, polarAreaLabels,
  radialBarSeries, radialBarLabels,
  radialBarSeries2, radialBarLabels2,
  radarSeries, radarXaxis, radarYaxis,
  heatmapSeries,
  treemapSeries,
} from './chart-mock-data';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    JsonPipe,
    UiButtonComponent,
    UiGridBoardComponent,
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
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  // ── Button Demo State ──────────────────────────────────────────────
  readonly variants: ButtonVariant[] = ['solid', 'outline', 'text'];
  readonly colors: ButtonColor[] = ['primary', 'accent', 'warn'];
  readonly sizes: ButtonSize[] = ['sm', 'md', 'lg'];

  readonly selectedVariant = signal<ButtonVariant>('solid');
  readonly selectedColor = signal<ButtonColor>('primary');
  readonly selectedSize = signal<ButtonSize>('md');
  readonly isDisabled = signal(false);
  readonly lastClick = signal<string>('—');

  // ── Grid Demo State ────────────────────────────────────────────────
  readonly gridItems = signal<GridItemConfig[]>([
    { id: 'kpi-radial', layout: { col: 1, row: 1, colSpan: 3, rowSpan: 2 } },
    { id: 'chart-revenue', layout: { col: 4, row: 1, colSpan: 5, rowSpan: 2 } },
    { id: 'chart-traffic', layout: { col: 9, row: 1, colSpan: 4, rowSpan: 2 } },
    { id: 'chart-bar', layout: { col: 1, row: 3, colSpan: 4, rowSpan: 2 } },
    { id: 'kpi-uptime', layout: { col: 5, row: 3, colSpan: 3, rowSpan: 2 } },
    { id: 'chart-line', layout: { col: 8, row: 3, colSpan: 5, rowSpan: 2 } },
    { id: 'chart-pie', layout: { col: 1, row: 5, colSpan: 3, rowSpan: 2 } },
    { id: 'chart-donut', layout: { col: 4, row: 5, colSpan: 3, rowSpan: 2 } },
    { id: 'chart-scatter', layout: { col: 7, row: 5, colSpan: 3, rowSpan: 2 } },
    { id: 'chart-bubble', layout: { col: 10, row: 5, colSpan: 3, rowSpan: 2 } },
    { id: 'chart-radar', layout: { col: 1, row: 7, colSpan: 4, rowSpan: 2 } },
    { id: 'chart-heatmap', layout: { col: 5, row: 7, colSpan: 4, rowSpan: 2 } },
    { id: 'chart-treemap', layout: { col: 9, row: 7, colSpan: 4, rowSpan: 2 } },
    { id: 'chart-range-area', layout: { col: 1, row: 9, colSpan: 4, rowSpan: 2 } },
    { id: 'chart-range-bar', layout: { col: 5, row: 9, colSpan: 4, rowSpan: 2 } },
    { id: 'chart-candlestick', layout: { col: 9, row: 9, colSpan: 4, rowSpan: 2 } },
    { id: 'chart-polar-area', layout: { col: 1, row: 11, colSpan: 3, rowSpan: 2 } },
    { id: 'chart-box-plot', layout: { col: 4, row: 11, colSpan: 5, rowSpan: 2 } },
  ]);

  onLayoutChange(items: GridItemConfig[]): void {
    this.gridItems.set(items);
  }

  // ── Expose mock data to template ────────────────────────────────────
  protected readonly mocks = {
    lineSeries, lineXaxis,
    areaSeries, areaXaxis,
    barSeries, barXaxis,
    scatterSeries,
    bubbleSeries,
    rangeAreaSeries,
    rangeBarSeries,
    candlestickSeries, candlestickXaxis,
    boxPlotSeries,
    pieSeries, pieLabels,
    donutSeries, donutLabels,
    polarAreaSeries, polarAreaLabels,
    radialBarSeries, radialBarLabels,
    radialBarSeries2, radialBarLabels2,
    radarSeries, radarXaxis, radarYaxis,
    heatmapSeries,
    treemapSeries,
  };
}