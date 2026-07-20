import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './input.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputComponent),
    multi: true
  }]
})
export class InputComponent implements ControlValueAccessor {
  @Input() placeholder = '';
  @Input() type = 'text';
  @Input() disabled = false;
  @Input() error = false;

  value = '';

  onChange = (_: any) => {};
  onTouched = () => {};

  writeValue(val: string) { this.value = val ?? ''; }
  registerOnChange(fn: any) { this.onChange = fn; }
  registerOnTouched(fn: any) { this.onTouched = fn; }
  setDisabledState(disabled: boolean) { this.disabled = disabled; }

  onInput(e: Event) {
    this.value = (e.target as HTMLInputElement).value;
    this.onChange(this.value);
  }

  get inputClasses(): string {
    return `w-full bg-bg rounded-xl py-3 px-4 font-body text-[0.9375rem] text-ink outline-none transition duration-150 placeholder:text-ink-light focus:bg-surface focus:border-terracotta focus:ring-[0.1875rem] focus:ring-terracotta/8 disabled:bg-bg-alt disabled:opacity-50 disabled:cursor-not-allowed border-[1.5px] ${this.error ? 'border-error' : 'border-border'}`;
  }
}
