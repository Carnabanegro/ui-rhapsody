import { describe, it, expect } from 'vitest';

describe('provideUiCore', () => {
  it('should be exported as a function', async () => {
    const mod = await import('@ui-rhapsody/core');
    expect(typeof mod.provideUiCore).toBe('function');
  });
});