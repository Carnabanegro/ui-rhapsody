# @ui-rhapsody/core

Core UI component library for Angular 22+.

## Installation

```bash
npm install @ui-rhapsody/core
```

### Peer Dependencies

- `@angular/common`: ^22.0.0
- `@angular/core`: ^22.0.0
- `@angular/cdk`: ^22.0.0

## Quick Start

Register the library in your application's bootstrap:

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { provideUiCore } from '@ui-rhapsody/core';
import { AppComponent } from './app.component';

bootstrapApplication(AppComponent, {
  providers: [...provideUiCore()],
});
```

## Components

| Component | Selector | Description |
|-----------|----------|-------------|
| `UiButtonComponent` | `<ui-button>` | Accessible button with variant, color, and size inputs |
| `UiGridBoardComponent` | `<ui-grid-board>` | CSS Grid dashboard with drag-and-drop layout |
| `UiGridItemComponent` | `<ui-grid-item>` | Grid item with pointer and keyboard resize |

## Exports

```typescript
// Components
export { UiButtonComponent } from '@ui-rhapsody/core';
export { UiGridBoardComponent, UiGridItemComponent } from '@ui-rhapsody/core';

// Types
export type { ButtonVariant, ButtonColor, ButtonSize } from '@ui-rhapsody/core';
export type { GridItemConfig, GridItemLayout } from '@ui-rhapsody/core';

// Utility functions
export { layoutsOverlap, findOverlapping, resolveLayout, compactUpward } from '@ui-rhapsody/core';

// Provider
export { provideUiCore } from '@ui-rhapsody/core';

// Component array
export { UI_CORE_COMPONENTS } from '@ui-rhapsody/core';
```

## License

MIT