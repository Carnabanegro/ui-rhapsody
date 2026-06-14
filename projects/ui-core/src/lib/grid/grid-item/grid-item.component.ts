import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  input,
  output,
  computed,
  signal,
  inject,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import type { GridItemConfig } from '../grid.models';

@Component({
  selector: 'ui-grid-item',
  standalone: true,
  imports: [],
  templateUrl: './grid-item.component.html',
  styleUrls: ['./grid-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
  host: {
    '[class.ui-grid-item]': 'true',
    '[class.ui-grid-item--resizing]': 'isResizing()',
    '[style.grid-column]': 'gridColumn()',
    '[style.grid-row]': 'gridRow()',
  },
})
export class UiGridItemComponent implements OnDestroy {
  /** Grid item configuration (position + span) */
  readonly config = input.required<GridItemConfig>();

  /** Emits the updated config when the user finishes resizing */
  readonly resizeEnd = output<GridItemConfig>();

  /** Whether the item is currently being resized (used for visual feedback) */
  readonly isResizing = signal(false);

  // ── Live resize signals (updated during drag for visual feedback) ──
  private readonly _liveColSpan = signal<number | null>(null);
  private readonly _liveRowSpan = signal<number | null>(null);

  /** Computed CSS grid-column value, uses live span during resize */
  readonly gridColumn = computed(
    () => `${this.config().layout.col} / span ${this._liveColSpan() ?? this.config().layout.colSpan}`
  );

  /** Computed CSS grid-row value, uses live span during resize */
  readonly gridRow = computed(
    () => `${this.config().layout.row} / span ${this._liveRowSpan() ?? this.config().layout.rowSpan}`
  );

  private readonly el = inject(ElementRef<HTMLElement>);

  // ── Resize state ──
  private resizeStartX = 0;
  private resizeStartY = 0;
  private originalColSpan = 0;
  private originalRowSpan = 0;
  private cellWidth = 0;
  private cellHeight = 0;

  // Bound event handlers (needed for document-level listeners)
  private readonly onPointerMove = (e: PointerEvent): void => this.handlePointerMove(e);
  private readonly onPointerUp = (e: PointerEvent): void => this.handlePointerUp(e);

  /** Initiate resize from the bottom-right handle. */
  onStartResize(event: PointerEvent): void {
    // Prevent the drag from starting when using the resize handle
    event.stopImmediatePropagation();
    event.preventDefault();

    this.isResizing.set(true);
    this.originalColSpan = this.config().layout.colSpan;
    this.originalRowSpan = this.config().layout.rowSpan;
    this.resizeStartX = event.clientX;
    this.resizeStartY = event.clientY;

    // Calculate cell dimensions from the current element size
    const el = this.el.nativeElement;
    this.cellWidth = el.offsetWidth / this.originalColSpan;
    this.cellHeight = el.offsetHeight / this.originalRowSpan;

    document.addEventListener('pointermove', this.onPointerMove);
    document.addEventListener('pointerup', this.onPointerUp);
  }

  private handlePointerMove(event: PointerEvent): void {
    const deltaX = event.clientX - this.resizeStartX;
    const deltaY = event.clientY - this.resizeStartY;
    const newColSpan = Math.max(1, this.originalColSpan + Math.round(deltaX / this.cellWidth));
    const newRowSpan = Math.max(1, this.originalRowSpan + Math.round(deltaY / this.cellHeight));
    this._liveColSpan.set(newColSpan);
    this._liveRowSpan.set(newRowSpan);
  }

  private handlePointerUp(_event: PointerEvent): void {
    document.removeEventListener('pointermove', this.onPointerMove);
    document.removeEventListener('pointerup', this.onPointerUp);

    const finalColSpan = this._liveColSpan() ?? this.originalColSpan;
    const finalRowSpan = this._liveRowSpan() ?? this.originalRowSpan;

    this._liveColSpan.set(null);
    this._liveRowSpan.set(null);
    this.isResizing.set(false);

    // Only emit if spans actually changed
    if (finalColSpan !== this.originalColSpan || finalRowSpan !== this.originalRowSpan) {
      this.resizeEnd.emit({
        ...this.config(),
        layout: {
          ...this.config().layout,
          colSpan: finalColSpan,
          rowSpan: finalRowSpan,
        },
      });
    }
  }

  ngOnDestroy(): void {
    // Safety cleanup in case the component is destroyed during resize
    document.removeEventListener('pointermove', this.onPointerMove);
    document.removeEventListener('pointerup', this.onPointerUp);
  }

  // ── Keyboard resize ──────────────────────────────────────────────────────

  /** Handle keyboard resize via arrow keys on the resize handle. */
  onResizeKeyDown(event: KeyboardEvent): void {
    const key = event.key;
    if (!['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'Enter', 'Escape'].includes(key)) {
      return;
    }
    event.preventDefault();

    // Enter/Escape confirm/dismiss — no action needed for discrete steps
    if (key === 'Enter' || key === 'Escape') return;

    const layout = { ...this.config().layout };
    if (key === 'ArrowRight') layout.colSpan = layout.colSpan + 1;
    if (key === 'ArrowLeft')  layout.colSpan = Math.max(1, layout.colSpan - 1);
    if (key === 'ArrowDown')  layout.rowSpan = layout.rowSpan + 1;
    if (key === 'ArrowUp')    layout.rowSpan = Math.max(1, layout.rowSpan - 1);

    this.resizeEnd.emit({ ...this.config(), layout });
  }
}