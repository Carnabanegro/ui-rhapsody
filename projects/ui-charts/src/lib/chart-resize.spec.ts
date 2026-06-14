import { describe, it, expect, vi } from 'vitest';
import type { ApexChartsRuntime } from './chart-types';

describe('ApexChartsRuntime', () => {
  it('should satisfy structural type contract', () => {
    const runtime: ApexChartsRuntime = {
      resize: vi.fn(),
      updateOptions: vi.fn(),
      destroy: vi.fn(),
    };
    expect(runtime.resize).toBeDefined();
    expect(runtime.updateOptions).toBeDefined();
    expect(runtime.destroy).toBeDefined();
  });

  it('should call resize method', () => {
    const resize = vi.fn();
    const runtime: ApexChartsRuntime = {
      resize,
      updateOptions: vi.fn(),
      destroy: vi.fn(),
    };
    runtime.resize();
    expect(resize).toHaveBeenCalledOnce();
  });

  it('should call updateOptions with correct params', () => {
    const updateOptions = vi.fn();
    const runtime: ApexChartsRuntime = {
      resize: vi.fn(),
      updateOptions,
      destroy: vi.fn(),
    };
    runtime.updateOptions({ chart: { width: 500, height: 300 } }, false, false, true);
    expect(updateOptions).toHaveBeenCalledWith({ chart: { width: 500, height: 300 } }, false, false, true);
  });

  it('should call destroy method', () => {
    const destroy = vi.fn();
    const runtime: ApexChartsRuntime = {
      resize: vi.fn(),
      updateOptions: vi.fn(),
      destroy,
    };
    runtime.destroy();
    expect(destroy).toHaveBeenCalledOnce();
  });
});