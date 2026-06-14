import { describe, it, expect } from 'vitest';
import { buildChartDefaults, CHART_CSS_VARS } from './chart-defaults';

describe('buildChartDefaults', () => {
  it('should return chart defaults with CSS var values', () => {
    const defaults = buildChartDefaults();
    expect(defaults.chart.fontFamily).toBe(CHART_CSS_VARS.fontFamily);
    expect(defaults.chart.background).toBe(CHART_CSS_VARS.background);
    expect(defaults.chart.toolbar).toEqual({ show: false });
    expect(defaults.chart.animations).toEqual({ enabled: true, speed: 400 });
  });

  it('should have theme mode light', () => {
    const defaults = buildChartDefaults();
    expect(defaults.theme.mode).toBe('light');
  });

  it('should have grid with CSS var border color', () => {
    const defaults = buildChartDefaults();
    expect(defaults.grid.borderColor).toBe(CHART_CSS_VARS.gridBorderColor);
    expect(defaults.grid.strokeDashArray).toBe(3);
  });

  it('should have dark tooltip theme', () => {
    const defaults = buildChartDefaults();
    expect(defaults.tooltip.theme).toBe('dark');
  });

  it('should have 7 colors in the palette', () => {
    const defaults = buildChartDefaults();
    expect(defaults.colors).toHaveLength(7);
  });
});