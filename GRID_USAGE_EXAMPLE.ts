// ============================================================================
// Ejemplo de uso: UiGridBoard + UiGridItem en un componente padre
// ============================================================================

import { Component, signal, TemplateRef } from '@angular/core';
import { UiGridBoardComponent, UiGridItemComponent, GridItemConfig } from 'ui-core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [UiGridBoardComponent, UiGridItemComponent],
  template: `
    <ui-grid-board
      [items]="dashboardItems()"
      [columns]="12"
      [gap]="16"
      [rowHeight]="120"
      (layoutChange)="onLayoutChange($event)">

      <!-- Template personalizado para cada item del grid -->
      <ng-template #itemDef let-item>
        <div class="dashboard-card">
          <h3>{{ item.id }}</h3>
          <p>Fila: {{ item.layout.row }}, Columna: {{ item.layout.col }}</p>
          <p>Span: {{ item.layout.colSpan }}x{{ item.layout.rowSpan }}</p>
        </div>
      </ng-template>

    </ui-grid-board>
  `,
  styles: [`
    .dashboard-card {
      height: 100%;
      padding: 12px;
    }

    .dashboard-card h3 {
      margin: 0 0 8px 0;
      font-size: 14px;
    }

    .dashboard-card p {
      margin: 0;
      font-size: 12px;
      opacity: 0.7;
    }
  `],
})
export class DashboardExampleComponent {
  // ── Estado inicial del dashboard ──────────────────────────────────────
  readonly dashboardItems = signal<GridItemConfig[]>([
    {
      id: 'kpi-revenue',
      layout: { col: 1, row: 1, colSpan: 3, rowSpan: 1 },
    },
    {
      id: 'kpi-users',
      layout: { col: 4, row: 1, colSpan: 3, rowSpan: 1 },
    },
    {
      id: 'kpi-orders',
      layout: { col: 7, row: 1, colSpan: 3, rowSpan: 1 },
    },
    {
      id: 'chart-sales',
      layout: { col: 1, row: 2, colSpan: 6, rowSpan: 2 },
    },
    {
      id: 'chart-traffic',
      layout: { col: 7, row: 2, colSpan: 6, rowSpan: 2 },
    },
    {
      id: 'table-recent',
      layout: { col: 1, row: 4, colSpan: 12, rowSpan: 1 },
    },
  ]);

  // ── Handler: el usuario movió o resizó un item ──────────────────────────
  onLayoutChange(updatedItems: GridItemConfig[]): void {
    console.log('New layout:', updatedItems);
    this.dashboardItems.set(updatedItems);

    // Opcional: persistir en backend o localStorage
    // this.layoutService.save(updatedItems);
  }
}