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
import { FocusMonitor, FocusOrigin } from '@angular/cdk/a11y';

export type ButtonVariant = 'solid' | 'outline' | 'text';
export type ButtonColor = 'primary' | 'accent' | 'warn';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'ui-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
  host: {
    'role': 'button',
    '(click)': 'onHostClick($event)',
  },
})
export class UiButtonComponent implements OnDestroy {
  /** Visual variant of the button */
  readonly variant = input<ButtonVariant>('solid');

  /** Color theme */
  readonly color = input<ButtonColor>('primary');

  /** Size of the button */
  readonly size = input<ButtonSize>('md');

  /** Whether the button is disabled */
  readonly disabled = input<boolean>(false);

  /** HTML button type attribute */
  readonly type = input<'button' | 'submit' | 'reset'>('button');

  /** ARIA label — use when the button contains only an icon */
  readonly ariaLabel = input<string | undefined>(undefined);

  /** Emits when the button is clicked and not disabled */
  readonly btnClick = output<void>();

  /** Computed class list for the inner <button> element */
  readonly buttonClasses = computed(() => [
    'ui-button',
    `ui-button--${this.variant()}`,
    `ui-button--${this.color()}`,
    `ui-button--${this.size()}`,
    this.disabled() ? 'ui-button--disabled' : null,
    this.isFocused() ? 'ui-button--focused' : null,
  ]);

  /** Whether the inner button is currently focused (tracked via CDK FocusMonitor) */
  readonly isFocused = computed(() => this._focusOrigin() !== null);

  private readonly _focusOrigin = signal<FocusOrigin | null>(null);
  private readonly _focusMonitor = inject(FocusMonitor);
  private readonly _elementRef = inject(ElementRef);

  constructor() {
    this._focusMonitor
      .monitor(this._elementRef, true)
      .subscribe((origin: FocusOrigin) => {
        this._focusOrigin.set(origin);
      });
  }

  ngOnDestroy(): void {
    this._focusMonitor.stopMonitoring(this._elementRef);
  }

  /** Handles click on host — delegates to btnClick output if not disabled */
  protected onHostClick(event: Event): void {
    if (this.disabled()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.btnClick.emit();
  }
}