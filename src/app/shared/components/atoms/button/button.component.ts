import { Component, computed, input, output } from '@angular/core';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'sage' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'py-2 px-[1.125rem] text-xs',
  md: 'py-3 px-7 text-sm',
  lg: 'py-4 px-10 text-base',
};

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: 'bg-terracotta text-white hover:opacity-90 hover:shadow-card',
  secondary: 'bg-transparent text-ink-mid border border-border hover:bg-bg-alt',
  ghost: 'bg-transparent text-terracotta border border-terracotta hover:opacity-90',
  sage: 'bg-sage text-white hover:opacity-90 hover:shadow-card-sage',
  danger: 'bg-error text-white hover:opacity-90 hover:shadow-card-danger',
};

@Component({
  selector: 'app-button',
  standalone: true,
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  variant = input<ButtonVariant>('primary');
  size = input<ButtonSize>('md');
  disabled = input<boolean>(false);
  clicked = output<void>();

  classes = computed(() =>
    `inline-flex items-center justify-center rounded-full font-body font-medium transition duration-150 cursor-pointer disabled:opacity-45 disabled:cursor-not-allowed disabled:pointer-events-none ${SIZE_CLASSES[this.size()]} ${VARIANT_CLASSES[this.variant()]}`
  );
}
