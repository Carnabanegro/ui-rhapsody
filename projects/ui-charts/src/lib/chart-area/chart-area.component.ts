import { Component, ChangeDetectionStrategy, ViewEncapsulation, input, output, computed, OnDestroy } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import type { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexYAxis, ApexStroke, ApexFill, ApexDataLabels, ApexTooltip, ApexLegend, ApexGrid, ApexMarkers, ApexTitleSubtitle } from '../chart-inputs';
import { buildChartDefaults } from '../chart-defaults';
import { connectChartResize, CHART_CONTAINER_STYLES } from '../chart-resize';
import type { ChartReadyEvent } from '../chart-types';

@Component({
  selector: 'ui-area-chart',
  standalone: true,
  imports: [ChartComponent],
  template: `<apx-chart [series]="series()" [chart]="chartConfig()" [xaxis]="xaxis()" [yaxis]="yaxis()" [stroke]="stroke()" [fill]="fillCfg()" [dataLabels]="dataLabels()" [tooltip]="mergedTooltip()" [legend]="mergedLegend()" [grid]="mergedGrid()" [markers]="markers()" [title]="title()" [colors]="mergedColors()" (chartReady)="onChartReady($event)" />`,
  styles: [CHART_CONTAINER_STYLES],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class UiAreaChartComponent implements OnDestroy {
  readonly series = input.required<ApexAxisChartSeries>();
  readonly height = input<number | string>(350);
  readonly xaxis = input<ApexXAxis>();
  readonly yaxis = input<ApexYAxis>();
  readonly stroke = input<ApexStroke>({ curve: 'smooth', width: 2 });
  readonly fill = input<ApexFill>();
  readonly dataLabels = input<ApexDataLabels>({ enabled: false });
  readonly tooltipOpt = input<ApexTooltip>();
  readonly legendOpt = input<ApexLegend>();
  readonly gridOpt = input<ApexGrid>();
  readonly markers = input<ApexMarkers>();
  readonly title = input<ApexTitleSubtitle>();
  readonly palette = input<string[]>();
  readonly chartReady = output<ChartReadyEvent>();

  private readonly defaults = buildChartDefaults();
  private readonly resizer = connectChartResize();

  onChartReady(event: ChartReadyEvent): void {
    this.resizer.setInstance(event.chartObj);
    this.chartReady.emit(event);
  }

  ngOnDestroy(): void {
    this.resizer.destroy();
  }

  readonly chartConfig = computed<ApexChart>(() => ({ ...this.defaults.chart, type: 'area', height: this.height() }));
  readonly fillCfg = computed<ApexFill>(() => this.fill() ?? { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.1, stops: [0, 100] } });
  readonly mergedColors = computed(() => this.palette() ?? this.defaults.colors);
  readonly mergedTooltip = computed(() => ({ ...this.defaults.tooltip, ...this.tooltipOpt() }));
  readonly mergedLegend = computed(() => ({ show: true, position: 'top' as const, ...this.legendOpt() }));
  readonly mergedGrid = computed(() => ({ ...this.defaults.grid, ...this.gridOpt() }));
}