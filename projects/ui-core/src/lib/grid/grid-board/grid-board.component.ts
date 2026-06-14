import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  input,
  output,
  computed,
  signal,
  TemplateRef,
  viewChild,
  ElementRef,
} from '@angular/core';
import { CdkDrag, CdkDragEnd, CdkDragStart } from '@angular/cdk/drag-drop';
import { NgTemplateOutlet } from '@angular/common';
import { UiGridItemComponent } from '../grid-item/grid-item.component';
import {
  type GridItemConfig,
  type GridItemLayout,
  layoutsOverlap,
  findOverlapping,
  resolveLayout,
} from '../grid.models';

@Component({
  selector: 'ui-grid-board',
  standalone: true,
  imports: [CdkDrag, NgTemplateOutlet, UiGridItemComponent],
  templateUrl: './grid-board.component.html',
  styleUrls: ['./grid-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.ui-grid-board-host]': 'true',
    '[class.ui-grid-board-host--dragging]': 'isDragging()',
  },
})
export class UiGridBoardComponent {
  /** Array of grid item configurations (required) */
  readonly items = input.required<GridItemConfig[]>();

  /** Number of columns in the grid (default: 12) */
  readonly columns = input(12);

  /** Gap between grid cells in pixels (default: 16) */
  readonly gap = input(16);

  /** Row height in pixels (default: 100) */
  readonly rowHeight = input(100);

  /** Whether drag & drop is disabled */
  readonly dragDisabled = input(false);

  /** Whether to show grid guide lines (default: true) */
  readonly showGridLines = input(true);

  /** Optional template to render custom content for each item */
  readonly itemTemplate = input<TemplateRef<{ $implicit: GridItemConfig }> | null>(null);

  /** Emits the full layout configuration whenever an item is moved or resized */
  readonly layoutChange = output<GridItemConfig[]>();

  /** Whether an item is currently being dragged (for visual feedback) */
  readonly isDragging = signal(false);

  /** Computed grid-template-columns CSS value */
  readonly gridTemplateColumns = computed(() => `repeat(${this.columns()}, 1fr)`);

  /** Maximum row occupied by any item (to know how many rows to draw grid lines for) */
  readonly maxRow = computed(() => {
    const items = this.items();
    if (items.length === 0) return 1;
    return items.reduce(
      (max, item) => Math.max(max, item.layout.row + item.layout.rowSpan),
      1,
    );
  });

  /** Grid cells for guide lines rendering */
  readonly gridCells = computed(() => {
    if (!this.showGridLines()) return [];
    const cols = this.columns();
    const rows = this.maxRow();
    const cells: { id: string; row: number; col: number }[] = [];
    for (let r = 1; r <= rows; r++) {
      for (let c = 1; c <= cols; c++) {
        cells.push({ id: `${r}-${c}`, row: r, col: c });
      }
    }
    return cells;
  });

  /** Reference to the grid container element for boundary calculations */
  readonly gridContainer = viewChild.required<ElementRef<HTMLElement>>('gridContainer');

  // ── Drag & Drop ─────────────────────────────────────────────────────────

  onDragStart(): void {
    this.isDragging.set(true);
  }

  onDragEnd(event: CdkDragEnd, item: GridItemConfig): void {
    this.isDragging.set(false);

    const distance = event.distance;
    const gridEl = this.gridContainer().nativeElement;
    const gridRect = gridEl.getBoundingClientRect();
    const cols = this.columns();
    const gapPx = this.gap();

    const cellWidth = (gridRect.width - (cols - 1) * gapPx) / cols;
    const cellHeight = this.rowHeight() + gapPx;

    const colOffset = Math.round(distance.x / (cellWidth + gapPx));
    const rowOffset = Math.round(distance.y / cellHeight);

    // Reset the transform so the item snaps back to its grid position
    event.source.reset();

    if (colOffset === 0 && rowOffset === 0) return;

    // Calculate new position, clamped to grid bounds
    const newCol = Math.max(
      1,
      Math.min(cols - item.layout.colSpan + 1, item.layout.col + colOffset),
    );
    const newRow = Math.max(1, item.layout.row + rowOffset);

    const newLayout: GridItemLayout = {
      ...item.layout,
      col: newCol,
      row: newRow,
    };

    const items = this.items();

    // Find items that overlap with the dragged item's new position
    const overlapping = findOverlapping(items, newLayout, item.id);

    let updatedItems: GridItemConfig[];

    if (overlapping.length === 1) {
      // ── Single overlap: SWAP positions ───────────────────────────────
      const target = overlapping[0];
      updatedItems = items.map((i) => {
        if (i.id === item.id) {
          return { ...i, layout: newLayout };
        }
        if (i.id === target.id) {
          // The target takes the dragged item's OLD position
          return { ...i, layout: { ...item.layout } };
        }
        return i;
      });
    } else {
      // ── Multiple overlaps or no overlap: move + resolve ──────────────
      updatedItems = items.map((i) =>
        i.id === item.id ? { ...i, layout: newLayout } : i,
      );
    }

    // Resolve any remaining overlaps and compact upward
    const resolved = resolveLayout(updatedItems, this.columns());
    this.layoutChange.emit(resolved);
  }

  // ── Resize ───────────────────────────────────────────────────────────────

  /** Handle resize end from a child UiGridItem */
  onResizeEnd(originalItem: GridItemConfig, resizedConfig: GridItemConfig): void {
    // Update the item with its new spans
    const updatedItems = this.items().map((item) =>
      item.id === resizedConfig.id ? resizedConfig : item,
    );

    // Resolve any overlaps caused by the resize + compact upward
    const resolved = resolveLayout(updatedItems, this.columns());
    this.layoutChange.emit(resolved);
  }
}