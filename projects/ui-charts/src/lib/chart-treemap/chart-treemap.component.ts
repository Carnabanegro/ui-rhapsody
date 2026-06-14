import { Component, ChangeDetectionStrategy, ViewEncapsulation, input, output, computed, OnDestroy } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import type { ApexAxisChartSeries, ApexChart, ApexStroke, ApexFill, ApexDataLabels, ApexTooltip, ApexLegend, ApexPlotOptions, ApexTitleSubtitle } from '../chart-inputs';
import { buildChartDefaults } from '../chart-defaults';
import { connectChartResize, chartHostStyles } from '../chart-resize';
import type { ChartReadyEvent } from '../chart-types';

@Component({ selector: 'ui-treemap-chart', standalone: true, imports: [ChartComponent], template: `<apx-chart [series]="series()" [chart]="chartConfig()" [stroke]="stroke()" [fill]="fill()" [dataLabels]="dataLabels()" [plotOptions]="plotOptions()" [tooltip]="mergedTooltip()" [legend]="mergedLegend()" [title]="title()" [colors]="mergedColors()" (chartReady)="onChartReady($event)" />`, styles: [chartHostStyles('ui-treemap-chart')], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None })
export class UiTreemapChartComponent implements OnDestroy {
  readonly series = input.required<ApexAxisChartSeries>();
  readonly height = input<number | string>(350);
  readonly stroke = input<ApexStroke>();
  readonly fill = input<ApexFill>();
  readonly dataLabels = input<ApexDataLabels>({ enabled: false });
  readonly plotOptions = input<ApexPlotOptions>();
  readonly tooltipOpt = input<ApexTooltip>();
  readonly legendOpt = input<ApexLegend>();
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
  readonly chartConfig = computed<ApexChart>(() => ({ ...this.defaults.chart, type: 'treemap', height: this.height() }));
  readonly mergedColors = computed(() => this.palette() ?? this.defaults.colors);
  readonly mergedTooltip = computed(() => ({ ...this.defaults.tooltip, ...this.tooltipOpt() }));
  readonly mergedLegend = computed(() => ({ show: true, position: 'bottom' as const, ...this.legendOpt() }));
}