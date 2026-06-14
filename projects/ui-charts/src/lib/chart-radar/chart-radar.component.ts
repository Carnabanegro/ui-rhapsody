import { Component, ChangeDetectionStrategy, ViewEncapsulation, input, output, computed, OnDestroy } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import type { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexYAxis, ApexStroke, ApexFill, ApexDataLabels, ApexTooltip, ApexLegend, ApexMarkers, ApexTitleSubtitle } from '../chart-inputs';
import { buildChartDefaults } from '../chart-defaults';
import { connectChartResize, chartHostStyles } from '../chart-resize';
import type { ChartReadyEvent } from '../chart-types';

@Component({ selector: 'ui-radar-chart', standalone: true, imports: [ChartComponent], template: `<apx-chart [series]="series()" [chart]="chartConfig()" [xaxis]="xaxis()" [yaxis]="yaxis()" [stroke]="stroke()" [fill]="fill()" [dataLabels]="dataLabels()" [tooltip]="mergedTooltip()" [legend]="mergedLegend()" [markers]="markers()" [title]="title()" [colors]="mergedColors()" (chartReady)="onChartReady($event)" />`, styles: [chartHostStyles('ui-radar-chart')], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None })
export class UiRadarChartComponent implements OnDestroy {
  readonly series = input.required<ApexAxisChartSeries>();
  readonly height = input<number | string>(350);
  readonly xaxis = input.required<ApexXAxis>();
  readonly yaxis = input<ApexYAxis>();
  readonly stroke = input<ApexStroke>({ width: 2 });
  readonly fill = input<ApexFill>({ opacity: 0.2 });
  readonly dataLabels = input<ApexDataLabels>();
  readonly tooltipOpt = input<ApexTooltip>();
  readonly legendOpt = input<ApexLegend>();
  readonly markers = input<ApexMarkers>({ size: 4 });
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
  readonly chartConfig = computed<ApexChart>(() => ({ ...this.defaults.chart, type: 'radar', height: this.height() }));
  readonly mergedColors = computed(() => this.palette() ?? this.defaults.colors);
  readonly mergedTooltip = computed(() => ({ ...this.defaults.tooltip, ...this.tooltipOpt() }));
  readonly mergedLegend = computed(() => ({ show: true, position: 'bottom' as const, ...this.legendOpt() }));
}