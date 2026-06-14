/**
 * Layout definition for a grid item within a 12-column CSS Grid.
 * Positions are 1-based (matching CSS Grid conventions).
 */
export interface GridItemLayout {
  /** Starting column (1-based) */
  col: number;
  /** Starting row (1-based) */
  row: number;
  /** Number of columns this item spans */
  colSpan: number;
  /** Number of rows this item spans */
  rowSpan: number;
}

/**
 * Configuration for a single grid item.
 * The consuming application provides an array of these to `UiGridBoard`.
 */
export interface GridItemConfig {
  /** Unique identifier for the grid item */
  id: string;
  /** Position and span within the grid */
  layout: GridItemLayout;
}

// ============================================================================
// Grid Layout Utilities — Collision Detection & Resolution
// ============================================================================

/** Check if two layout rectangles overlap */
export function layoutsOverlap(a: GridItemLayout, b: GridItemLayout): boolean {
  return !(
    a.col + a.colSpan <= b.col ||
    b.col + b.colSpan <= a.col ||
    a.row + a.rowSpan <= b.row ||
    b.row + b.rowSpan <= a.row
  );
}

/**
 * Find all items that overlap with the given layout,
 * excluding the item with the specified ID.
 */
export function findOverlapping(
  items: GridItemConfig[],
  layout: GridItemLayout,
  excludeId?: string,
): GridItemConfig[] {
  return items.filter(
    (item) => item.id !== excludeId && layoutsOverlap(item.layout, layout),
  );
}

/**
 * Resolve all overlapping items by pushing them down.
 * Items are processed top-to-bottom, left-to-right.
 * Each item that overlaps with a previously placed item gets pushed down.
 * Then items are compacted upward to remove empty gaps.
 */
export function resolveLayout(
  items: GridItemConfig[],
  columns: number,
): GridItemConfig[] {
  // Sort by row then column for deterministic placement order
  const sorted = [...items].sort(
    (a, b) => a.layout.row - b.layout.row || a.layout.col - b.layout.col,
  );

  const resolved: GridItemConfig[] = [];

  for (const item of sorted) {
    let layout = { ...item.layout };

    // Clamp column so the item doesn't overflow the grid
    if (layout.col + layout.colSpan > columns + 1) {
      layout.col = Math.max(1, columns + 1 - layout.colSpan);
    }

    // Push down until there's no overlap with any already-placed item
    let hasOverlap = true;
    while (hasOverlap) {
      hasOverlap = false;
      for (const placed of resolved) {
        if (layoutsOverlap(layout, placed.layout)) {
          layout = {
            ...layout,
            row: placed.layout.row + placed.layout.rowSpan,
          };
          hasOverlap = true;
          break;
        }
      }
    }

    resolved.push({ ...item, layout });
  }

  return compactUpward(resolved, columns);
}

/**
 * Compact items upward — remove gaps by moving each item
 * as far up as possible without overlapping other items.
 */
export function compactUpward(
  items: GridItemConfig[],
  columns: number,
): GridItemConfig[] {
  const sorted = [...items].sort(
    (a, b) => a.layout.row - b.layout.row || a.layout.col - b.layout.col,
  );

  const compacted: GridItemConfig[] = [];

  for (const item of sorted) {
    let layout = { ...item.layout };

    // Clamp column
    if (layout.col + layout.colSpan > columns + 1) {
      layout.col = Math.max(1, columns + 1 - layout.colSpan);
    }

    // Move up row-by-row until we'd overlap with something
    while (layout.row > 1) {
      const candidate = { ...layout, row: layout.row - 1 };
      if (compacted.some((other) => layoutsOverlap(candidate, other.layout))) {
        break;
      }
      layout = candidate;
    }

    compacted.push({ ...item, layout });
  }

  return compacted;
}