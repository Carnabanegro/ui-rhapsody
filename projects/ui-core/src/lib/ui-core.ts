import { Type, EnvironmentProviders, importProvidersFrom, provideZonelessChangeDetection } from '@angular/core';
import { UiButtonComponent } from './button/button.component';
import { UiGridBoardComponent } from './grid/grid-board/grid-board.component';
import { UiGridItemComponent } from './grid/grid-item/grid-item.component';

export { UiButtonComponent } from './button/button.component';
export type {
  ButtonVariant,
  ButtonColor,
  ButtonSize,
} from './button/button.component';

export { UiGridBoardComponent } from './grid/grid-board/grid-board.component';
export { UiGridItemComponent } from './grid/grid-item/grid-item.component';
export type {
  GridItemConfig,
  GridItemLayout,
} from './grid/grid.models';

export {
  layoutsOverlap,
  findOverlapping,
  resolveLayout,
  compactUpward,
} from './grid/grid.models';

export const UI_CORE_COMPONENTS: readonly Type<unknown>[] = [
  UiButtonComponent,
  UiGridBoardComponent,
  UiGridItemComponent,
];

/**
 * Provides core UI components and zoneless change detection.
 * Use in `bootstrapApplication` providers:
 * ```ts
 * bootstrapApplication(App, { providers: [...provideUiCore()] });
 * ```
 */
export function provideUiCore(): EnvironmentProviders[] {
  return [
    provideZonelessChangeDetection(),
    importProvidersFrom(...UI_CORE_COMPONENTS),
  ];
}