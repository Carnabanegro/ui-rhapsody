# @ui-rhapsody/charts

Chart UI component library for Angular 22+ — 16 ApexCharts wrapper components.

## Installation

```bash
npm install @ui-rhapsody/charts apexcharts ng-apexcharts
```

### Peer Dependencies

- `@angular/common`: ^22.0.0
- `@angular/core`: ^22.0.0
- `@angular/cdk`: ^22.0.0
- `apexcharts`: ^5.0.0
- `ng-apexcharts`: ^2.4.0

## Quick Start

Register the library in your application's bootstrap:

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { provideUiCharts } from '@ui-rhapsody/charts';
import { AppComponent } from './app.component';

bootstrapApplication(AppComponent, {
  providers: [...provideUiCharts()],
});
```

## Chart Types

| Component | Selector | Chart Type |
|-----------|----------|------------|
| `UiLineChartComponent` | `<ui-line-chart>` | Line |
| `UiAreaChartComponent` | `<ui-area-chart>` | Area |
| `UiBarChartComponent` | `<ui-bar-chart>` | Bar |
| `UiScatterChartComponent` | `<ui-scatter-chart>` | Scatter |
| `UiBubbleChartComponent` | `<ui-bubble-chart>` | Bubble |
| `UiRangeAreaChartComponent` | `<ui-range-area-chart>` | Range Area |
| `UiRangeBarChartComponent` | `<ui-range-bar-chart>` | Range Bar |
| `UiCandlestickChartComponent` | `<ui-candlestick-chart>` | Candlestick |
| `UiBoxPlotChartComponent` | `<ui-box-plot-chart>` | Box Plot |
| `UiPieChartComponent` | `<ui-pie-chart>` | Pie |
| `UiDonutChartComponent` | `<ui-donut-chart>` | Donut |
| `UiPolarAreaChartComponent` | `<ui-polar-area-chart>` | Polar Area |
| `UiRadialBarChartComponent` | `<ui-radial-bar-chart>` | Radial Bar |
| `UiRadarChartComponent` | `<ui-radar-chart>` | Radar |
| `UiHeatmapChartComponent` | `<ui-heatmap-chart>` | Heatmap |
| `UiTreemapChartComponent` | `<ui-treemap-chart>` | Treemap |

## Theming

Charts use CSS custom properties for theming. Override them globally or per-instance:

```css
:root {
  --ui-charts-color-primary: #6750a4;
  --ui-charts-color-secondary: #e8def8;
  --ui-charts-font-family: 'Roboto', sans-serif;
  --ui-charts-font-size: 13px;
  --ui-charts-background: transparent;
  --ui-charts-grid-border-color: #e0e0e0;
  --ui-charts-tooltip-background: #263238;
  --ui-charts-tooltip-color: #ffffff;
}
```

## License

MIT