import { describe, it, expect } from 'vitest';
import { UiGridItemComponent } from '@ui-rhapsody/core';

describe('UiGridItemComponent', () => {
  it('should be defined', () => {
    expect(UiGridItemComponent).toBeDefined();
  });

  it('should have onResizeKeyDown method', () => {
    expect(typeof UiGridItemComponent.prototype.onResizeKeyDown).toBe('function');
  });
});