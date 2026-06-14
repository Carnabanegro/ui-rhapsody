import { Component, ChangeDetectionStrategy, ViewEncapsulation, input, output, computed, OnDestroy } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import type { ApexNonAxisChartSeries, ApexChart, ApexTooltip, ApexLegend, ApexTitleSubtitle, ApexDataLabels } from '../chart-inputs';
import { buildChartDefaults } from '../chart-defaults';
import { connectChartResize, chartHostStyles } from '../chart-resize';
import type { ChartReadyEvent } from '../chart-types';

@Component({ selector: 'ui-pie-chart', standalone: true, imports: [ChartComponent], template: `<apx-chart [series]="series()" [chart]="chartConfig()" [labels]="labels()" [dataLabels]="dataLabels()" [tooltip]="mergedTooltip()" [legend]="mergedLegend()" [title]="title()" [colors]="mergedColors()" (chartReady)="onChartReady($event)" />`, styles: [chartHostStyles('ui-pie-chart')], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None })
export class UiPieChartComponent implements OnDestroy {
  readonly series = input.required<ApexNonAxisChartSeries>();
  readonly labels = input.required<string[]>();
  readonly height = input<number | string>(350);
  readonly dataLabels = input<ApexDataLabels>();
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
  readonly chartConfig = computed<ApexChart>(() => ({ ...this.defaults.chart, type: 'pie', height: this.height() }));
  readonly mergedColors = computed(() => this.palette() ?? this.defaults.colors);
  readonly mergedTooltip = computed(() => ({ ...this.defaults.tooltip, ...this.tooltipOpt() }));
  readonly mergedLegend = computed(() => ({ show: true, position: 'bottom' as const, ...this.legendOpt() }));
}