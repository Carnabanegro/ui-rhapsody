import { Component, ChangeDetectionStrategy, ViewEncapsulation, input, output, computed, OnDestroy } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import type { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexYAxis, ApexStroke, ApexFill, ApexDataLabels, ApexTooltip, ApexLegend, ApexPlotOptions, ApexGrid, ApexTitleSubtitle } from '../chart-inputs';
import { buildChartDefaults } from '../chart-defaults';
import { connectChartResize, chartHostStyles } from '../chart-resize';
import type { ChartReadyEvent } from '../chart-types';

@Component({
  selector: 'ui-bar-chart',
  standalone: true,
  imports: [ChartComponent],
  template: `<apx-chart [series]="series()" [chart]="chartConfig()" [xaxis]="xaxis()" [yaxis]="yaxis()" [stroke]="stroke()" [fill]="fill()" [dataLabels]="dataLabels()" [tooltip]="mergedTooltip()" [legend]="mergedLegend()" [grid]="mergedGrid()" [plotOptions]="plotOptions()" [title]="title()" [colors]="mergedColors()" (chartReady)="onChartReady($event)" />`,
  styles: [chartHostStyles('ui-bar-chart')],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class UiBarChartComponent implements OnDestroy {
  readonly series = input.required<ApexAxisChartSeries>();
  readonly height = input<number | string>(350);
  readonly xaxis = input<ApexXAxis>();
  readonly yaxis = input<ApexYAxis>();
  readonly stroke = input<ApexStroke>({ show: true, width: 2, colors: ['transparent'] });
  readonly fill = input<ApexFill>({ opacity: 1 });
  readonly dataLabels = input<ApexDataLabels>({ enabled: false });
  readonly tooltipOpt = input<ApexTooltip>();
  readonly legendOpt = input<ApexLegend>();
  readonly gridOpt = input<ApexGrid>();
  readonly plotOptions = input<ApexPlotOptions>({ bar: { borderRadius: 4, columnWidth: '60%', horizontal: false } });
  readonly title = input<ApexTitleSubtitle>();
  readonly palette = input<string[]>();
  readonly chartReady = output<ChartReadyEvent>();

  private readonly resizer = connectChartResize();

  onChartReady(event: ChartReadyEvent): void {
    this.resizer.setInstance(event.chartObj);
    this.chartReady.emit(event);
  }

  ngOnDestroy(): void {
    this.resizer.destroy();
  }

  private readonly defaults = buildChartDefaults();

  readonly chartConfig = computed<ApexChart>(() => ({ ...this.defaults.chart, type: 'bar', height: this.height() }));
  readonly mergedColors = computed(() => this.palette() ?? this.defaults.colors);
  readonly mergedTooltip = computed(() => ({ ...this.defaults.tooltip, ...this.tooltipOpt() }));
  readonly mergedLegend = computed(() => ({ show: true, position: 'top' as const, horizontalAlign: 'right' as const, ...this.legendOpt() }));
  readonly mergedGrid = computed(() => ({ ...this.defaults.grid, ...this.gridOpt() }));
}