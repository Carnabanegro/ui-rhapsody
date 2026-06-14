/**
 * Mock data for all 16 ui-charts component types.
 * Each export matches the required `input()` shape of its chart component.
 */
import type {
  ApexAxisChartSeries,
  ApexNonAxisChartSeries,
  ApexXAxis,
  ApexYAxis,
  ApexPlotOptions,
  ApexStroke,
  ApexFill,
  ApexDataLabels,
} from 'ng-apexcharts';

// ── Shared x-axis categories ──────────────────────────────────────────
const months: ApexXAxis = {
  categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
};

const weekdays: ApexXAxis = {
  categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
};

// ── 1. Line Chart ─────────────────────────────────────────────────────
export const lineSeries: ApexAxisChartSeries = [
  { name: 'Sessions', data: [45, 52, 38, 65, 48, 70, 55, 80, 62, 90, 78, 95] },
  { name: 'Bounce Rate', data: [28, 35, 22, 40, 30, 42, 35, 50, 38, 55, 42, 48] },
];
export const lineXaxis = months;

// ── 2. Area Chart ──────────────────────────────────────────────────────
export const areaSeries: ApexAxisChartSeries = [
  { name: 'Revenue', data: [31, 40, 28, 51, 42, 109, 100, 120, 95, 140, 130, 155] },
  { name: 'Expenses', data: [11, 32, 45, 32, 34, 52, 41, 60, 55, 80, 70, 90] },
];
export const areaXaxis = months;

// ── 3. Bar Chart ───────────────────────────────────────────────────────
export const barSeries: ApexAxisChartSeries = [
  { name: 'Organic', data: [44, 55, 57, 56, 61, 58, 63, 72, 68, 75, 80, 85] },
  { name: 'Referral', data: [76, 85, 101, 98, 87, 105, 91, 114, 94, 100, 110, 120] },
];
export const barXaxis = months;

// ── 4. Scatter Chart ───────────────────────────────────────────────────
export const scatterSeries: ApexAxisChartSeries = [
  { name: 'Team A', data: [[16, 5], [19, 8], [22, 12], [28, 18], [32, 25], [38, 30], [42, 28], [48, 35]] },
  { name: 'Team B', data: [[10, 8], [15, 14], [20, 20], [25, 22], [30, 28], [35, 32], [40, 30], [50, 40]] },
];

// ── 5. Bubble Chart ───────────────────────────────────────────────────
export const bubbleSeries: ApexAxisChartSeries = [
  { name: 'Product A', data: [[10, 50, 12], [20, 60, 18], [30, 45, 10], [40, 70, 22]] },
  { name: 'Product B', data: [[15, 30, 8], [25, 55, 15], [35, 65, 20], [45, 40, 12]] },
];

// ── 6. Range Area Chart ────────────────────────────────────────────────
export const rangeAreaSeries: ApexAxisChartSeries = [
  {
    name: 'Temperature Range',
    data: [
      { x: 'Jan', y: [2, 8] },
      { x: 'Feb', y: [3, 11] },
      { x: 'Mar', y: [5, 16] },
      { x: 'Apr', y: [8, 20] },
      { x: 'May', y: [12, 25] },
      { x: 'Jun', y: [16, 30] },
      { x: 'Jul', y: [19, 33] },
      { x: 'Aug', y: [18, 32] },
      { x: 'Sep', y: [14, 27] },
      { x: 'Oct', y: [10, 21] },
      { x: 'Nov', y: [5, 14] },
      { x: 'Dec', y: [3, 9] },
    ],
  },
  {
    name: 'Average',
    data: [
      { x: 'Jan', y: 5 },
      { x: 'Feb', y: 7 },
      { x: 'Mar', y: 10 },
      { x: 'Apr', y: 14 },
      { x: 'May', y: 18 },
      { x: 'Jun', y: 23 },
      { x: 'Jul', y: 26 },
      { x: 'Aug', y: 25 },
      { x: 'Sep', y: 20 },
      { x: 'Oct', y: 15 },
      { x: 'Nov', y: 9 },
      { x: 'Dec', y: 6 },
    ],
  },
];

// ── 7. Range Bar (Timeline) Chart ──────────────────────────────────────
export const rangeBarSeries: ApexAxisChartSeries = [
  {
    name: 'Project Alpha',
    data: [
      { x: 'Design', y: [new Date('2025-01-01').getTime(), new Date('2025-01-15').getTime()] },
      { x: 'Development', y: [new Date('2025-01-10').getTime(), new Date('2025-02-20').getTime()] },
      { x: 'QA', y: [new Date('2025-02-15').getTime(), new Date('2025-03-01').getTime()] },
    ],
  },
  {
    name: 'Project Beta',
    data: [
      { x: 'Design', y: [new Date('2025-01-05').getTime(), new Date('2025-01-25').getTime()] },
      { x: 'Development', y: [new Date('2025-01-20').getTime(), new Date('2025-03-10').getTime()] },
      { x: 'QA', y: [new Date('2025-03-01').getTime(), new Date('2025-03-15').getTime()] },
    ],
  },
];

// ── 8. Candlestick Chart ───────────────────────────────────────────────
export const candlestickSeries: ApexAxisChartSeries = [
  {
    name: 'Price',
    data: [
      { x: new Date('2025-01-01'), y: [51, 56, 49, 54] },
      { x: new Date('2025-01-08'), y: [54, 61, 52, 58] },
      { x: new Date('2025-01-15'), y: [58, 64, 55, 60] },
      { x: new Date('2025-01-22'), y: [60, 67, 58, 65] },
      { x: new Date('2025-01-29'), y: [65, 70, 62, 68] },
      { x: new Date('2025-02-05'), y: [68, 74, 65, 72] },
      { x: new Date('2025-02-12'), y: [72, 78, 70, 75] },
      { x: new Date('2025-02-19'), y: [75, 80, 72, 77] },
    ],
  },
];
export const candlestickXaxis: ApexXAxis = { type: 'datetime' };

// ── 9. Box Plot Chart ─────────────────────────────────────────────────
export const boxPlotSeries: ApexAxisChartSeries = [
  {
    name: 'Response Time (ms)',
    data: [
      { x: 'API /users', y: [22, 35, 50, 65, 90] },
      { x: 'API /orders', y: [30, 42, 58, 72, 110] },
      { x: 'API /products', y: [15, 28, 40, 55, 78] },
      { x: 'API /auth', y: [18, 24, 35, 48, 65] },
      { x: 'API /search', y: [45, 60, 80, 105, 180] },
    ],
  },
];

// ── 10. Pie Chart ──────────────────────────────────────────────────────
export const pieSeries: ApexNonAxisChartSeries = [42, 28, 18, 12];
export const pieLabels = ['Desktop', 'Mobile', 'Tablet', 'Other'];

// ── 11. Donut Chart ────────────────────────────────────────────────────
export const donutSeries: ApexNonAxisChartSeries = [65, 20, 10, 5];
export const donutLabels = ['Direct', 'Social', 'Email', 'Affiliate'];

// ── 12. Polar Area Chart ───────────────────────────────────────────────
export const polarAreaSeries: ApexNonAxisChartSeries = [14, 23, 21, 17, 15, 11];
export const polarAreaLabels = ['React', 'Angular', 'Vue', 'Svelte', 'Solid', 'Others'];

// ── 13. Radial Bar Chart ───────────────────────────────────────────────
export const radialBarSeries: ApexNonAxisChartSeries = [72, 58, 89];
export const radialBarLabels = ['Sales', 'Conversion', 'Uptime'];

export const radialBarSeries2: ApexNonAxisChartSeries = [99.9, 95.2, 88];
export const radialBarLabels2 = ['Uptime', 'SLA', 'Coverage'];

// ── 14. Radar Chart ────────────────────────────────────────────────────
export const radarSeries: ApexAxisChartSeries = [
  { name: 'Team A', data: [80, 50, 30, 40, 100, 20] },
  { name: 'Team B', data: [20, 70, 60, 80, 40, 90] },
];
export const radarXaxis: ApexXAxis = {
  categories: ['Performance', 'Reliability', 'Usability', 'Security', 'Scalability', 'Cost'],
};
export const radarYaxis: ApexYAxis = { min: 0, max: 100 };

// ── 15. Heatmap Chart ──────────────────────────────────────────────────
function generateHeatmapData(name: string, min: number, max: number): { name: string; data: { x: string; y: number }[] } {
  return {
    name,
    data: weekdays.categories!.map((d: string) => ({ x: d, y: Math.floor(Math.random() * (max - min + 1)) + min })),
  };
}
export const heatmapSeries: ApexAxisChartSeries = [
  generateHeatmapData('Metric A', 10, 90),
  generateHeatmapData('Metric B', 20, 80),
  generateHeatmapData('Metric C', 30, 95),
  generateHeatmapData('Metric D', 5, 70),
  generateHeatmapData('Metric E', 15, 85),
];

// ── 16. Treemap Chart ──────────────────────────────────────────────────
export const treemapSeries: ApexAxisChartSeries = [
  {
    name: 'Revenue by Segment',
    data: [
      { x: 'Enterprise', y: 420 },
      { x: 'SMB', y: 310 },
      { x: 'Startup', y: 180 },
      { x: 'Consumer', y: 280 },
      { x: 'Government', y: 150 },
      { x: 'Education', y: 90 },
    ],
  },
];