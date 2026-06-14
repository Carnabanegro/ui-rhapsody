import { describe, it, expect } from 'vitest';
import {
  layoutsOverlap,
  findOverlapping,
  resolveLayout,
  compactUpward,
  type GridItemConfig,
  type GridItemLayout,
} from '@ui-rhapsody/core';

describe('layoutsOverlap', () => {
  it('should detect overlapping layouts', () => {
    const a: GridItemLayout = { col: 1, row: 1, colSpan: 3, rowSpan: 2 };
    const b: GridItemLayout = { col: 2, row: 1, colSpan: 3, rowSpan: 2 };
    expect(layoutsOverlap(a, b)).toBe(true);
  });

  it('should detect non-overlapping layouts (side by side)', () => {
    const a: GridItemLayout = { col: 1, row: 1, colSpan: 3, rowSpan: 2 };
    const b: GridItemLayout = { col: 4, row: 1, colSpan: 3, rowSpan: 2 };
    expect(layoutsOverlap(a, b)).toBe(false);
  });

  it('should detect non-overlapping layouts (stacked vertically)', () => {
    const a: GridItemLayout = { col: 1, row: 1, colSpan: 3, rowSpan: 2 };
    const b: GridItemLayout = { col: 1, row: 3, colSpan: 3, rowSpan: 2 };
    expect(layoutsOverlap(a, b)).toBe(false);
  });

  it('should detect overlapping with same position', () => {
    const a: GridItemLayout = { col: 1, row: 1, colSpan: 2, rowSpan: 2 };
    const b: GridItemLayout = { col: 1, row: 1, colSpan: 2, rowSpan: 2 };
    expect(layoutsOverlap(a, b)).toBe(true);
  });

  it('should detect touching edges as non-overlapping', () => {
    const a: GridItemLayout = { col: 1, row: 1, colSpan: 2, rowSpan: 2 };
    const b: GridItemLayout = { col: 3, row: 1, colSpan: 2, rowSpan: 2 };
    expect(layoutsOverlap(a, b)).toBe(false);
  });
});

describe('findOverlapping', () => {
  const items: GridItemConfig[] = [
    { id: 'a', layout: { col: 1, row: 1, colSpan: 3, rowSpan: 2 } },
    { id: 'b', layout: { col: 4, row: 1, colSpan: 3, rowSpan: 2 } },
    { id: 'c', layout: { col: 2, row: 1, colSpan: 3, rowSpan: 2 } },
  ];

  it('should find overlapping items', () => {
    const layout: GridItemLayout = { col: 2, row: 1, colSpan: 3, rowSpan: 2 };
    const result = findOverlapping(items, layout);
    // layout overlaps with 'a' (col 1-4), 'c' (col 2-5) — and also 'b' (col 4-7) overlaps because col 4 < col 5
    expect(result.length).toBeGreaterThanOrEqual(2);
    expect(result.map((i) => i.id)).toContain('a');
    expect(result.map((i) => i.id)).toContain('c');
  });

  it('should exclude specified id from overlap check', () => {
    const layout: GridItemLayout = { col: 2, row: 1, colSpan: 3, rowSpan: 2 };
    const result = findOverlapping(items, layout, 'a');
    // Excluding 'a', only 'c' (and maybe 'b') should overlap
    expect(result.length).toBeGreaterThanOrEqual(1);
    expect(result.map((i) => i.id)).toContain('c');
  });

  it('should return empty array when no overlaps', () => {
    const layout: GridItemLayout = { col: 7, row: 1, colSpan: 3, rowSpan: 2 };
    const result = findOverlapping(items, layout);
    expect(result).toHaveLength(0);
  });
});

describe('resolveLayout', () => {
  it('should push overlapping items down', () => {
    const items: GridItemConfig[] = [
      { id: 'a', layout: { col: 1, row: 1, colSpan: 3, rowSpan: 2 } },
      { id: 'b', layout: { col: 1, row: 1, colSpan: 3, rowSpan: 2 } },
    ];
    const result = resolveLayout(items, 12);
    const itemA = result.find((i) => i.id === 'a')!;
    const itemB = result.find((i) => i.id === 'b')!;
    expect(itemA.layout.row).toBe(1);
    expect(itemB.layout.row).toBeGreaterThan(1);
  });

  it('should compact items upward', () => {
    const items: GridItemConfig[] = [
      { id: 'a', layout: { col: 1, row: 5, colSpan: 3, rowSpan: 2 } },
    ];
    const result = resolveLayout(items, 12);
    expect(result[0].layout.row).toBe(1);
  });

  it('should clamp column overflow', () => {
    const items: GridItemConfig[] = [
      { id: 'a', layout: { col: 11, row: 1, colSpan: 3, rowSpan: 2 } },
    ];
    const result = resolveLayout(items, 12);
    expect(result[0].layout.col).toBe(10);
  });
});

describe('compactUpward', () => {
  it('should move items up to fill gaps', () => {
    const items: GridItemConfig[] = [
      { id: 'a', layout: { col: 1, row: 4, colSpan: 3, rowSpan: 2 } },
    ];
    const result = compactUpward(items, 12);
    expect(result[0].layout.row).toBe(1);
  });

  it('should not move items that would overlap', () => {
    const items: GridItemConfig[] = [
      { id: 'a', layout: { col: 1, row: 1, colSpan: 3, rowSpan: 2 } },
      { id: 'b', layout: { col: 1, row: 4, colSpan: 3, rowSpan: 2 } },
    ];
    const result = compactUpward(items, 12);
    const itemB = result.find((i) => i.id === 'b')!;
    expect(itemB.layout.row).toBe(3);
  });
});