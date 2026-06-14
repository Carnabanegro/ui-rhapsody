import { ElementRef, inject } from '@angular/core';
import type { ApexChartsRuntime } from './chart-types';

// ── Chart container styles ──────────────────────────────────────────────
// Every chart component must include these styles to establish a proper
// height chain from the host element down to the ApexCharts container.
//
// IMPORTANT: With ViewEncapsulation.None, `:host` does NOT work because
// there is no Shadow DOM. Each chart component MUST set its own host styles
// using chartHostStyles('ui-xxx-chart') which generates selector-scoped CSS.
export const CHART_CONTAINER_STYLES = '';

/**
 * Generates scoped host styles for a chart component.
 * Usage in component decorator:
 *   `styles: [chartHostStyles('ui-line-chart')]`
 *
 * This creates:
 *   ui-line-chart { display: block; width: 100%; height: 100%; }
 *   ui-line-chart apx-chart { display: block; width: 100%; height: 100%; }
 *
 * Both rules are scoped to the specific chart selector, preventing global leaks
 * while ensuring the height chain works with ViewEncapsulation.None.
 */
export function chartHostStyles(selector: string): string {
  return `${selector} { display: block; width: 100%; height: 100%; } ${selector} apx-chart { display: block; width: 100%; height: 100%; }`;
}

// ── Resize handle interface ──────────────────────────────────────────────
export interface ChartResizeHandle {
  /** Call when ApexCharts emits chartReady to start auto-resize. */
  setInstance: (chart: ApexChartsRuntime) => void;
  /** Disconnect the ResizeObserver. Call in ngOnDestroy. */
  destroy: () => void;
}

/**
 * Sets up a ResizeObserver on the host element that resizes the ApexCharts
 * instance whenever the host dimensions change.
 *
 * Uses `chart.resize()` as the primary mechanism. As a fallback, if the
 * host dimensions don't match the chart's internal container after resize
 * (which can happen when apexcharts caches a pixel height from its initial
 * render), it calls `chart.updateOptions()` with explicit pixel dimensions
 * from the host element.
 *
 * Must be called in the injection context (constructor or field initializer).
 */
export function connectChartResize(): ChartResizeHandle {
  const el = inject(ElementRef<HTMLElement>);
  let chartInstance: ApexChartsRuntime | null = null;
  let resizeQueued = false;

  const observer = new ResizeObserver(() => {
    if (!chartInstance) return;
    // Debounce: only one resize per animation frame
    if (resizeQueued) return;
    resizeQueued = true;
    requestAnimationFrame(() => {
      resizeQueued = false;
      if (!chartInstance) return;

      const hostH = el.nativeElement.clientHeight;
      const hostW = el.nativeElement.clientWidth;

      // Primary: lightweight resize — works when the CSS height chain
      // is intact and ApexCharts can re-read the container dimensions.
      chartInstance.resize();

      // Belt-and-suspenders: if the host shrank but ApexCharts' internal
      // container still reports the old height, force an updateOptions
      // with the correct pixel dimensions.
      const chartEl = el.nativeElement.querySelector('.apexcharts-canvas') as HTMLElement | null;
      if (chartEl && Math.abs(chartEl.clientHeight - hostH) > 2) {
        chartInstance.updateOptions(
          { chart: { width: hostW, height: hostH } },
          false, // redrawPaths
          false, // animate — no animation during resize
          true,  // updateSyncedCharts
        );
      }
    });
  });

  observer.observe(el.nativeElement);

  return {
    setInstance: (chart: ApexChartsRuntime) => {
      chartInstance = chart;
    },
    destroy: () => {
      observer.disconnect();
      chartInstance = null;
    },
  };
}