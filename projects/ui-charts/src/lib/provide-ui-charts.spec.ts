import { describe, it, expect } from 'vitest';

describe('provideUiCharts', () => {
  it('should be exported as a function', async () => {
    const mod = await import('@ui-rhapsody/charts');
    expect(typeof mod.provideUiCharts).toBe('function');
  });
});