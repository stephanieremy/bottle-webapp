import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import {CommonModule} from '@angular/common';

export interface SelectOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './select.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectComponent),
    multi: true
  }]
})
export class SelectComponent implements ControlValueAccessor {
  @Input() placeholder = 'Sélectionner…';
  @Input() options: SelectOption[] = [];
  @Input() disabled = false;

  value = '';

  onChange = (_: any) => {};
  onTouched = () => {};

  writeValue(val: string) { this.value = val ?? ''; }
  registerOnChange(fn: any) { this.onChange = fn; }
  registerOnTouched(fn: any) { this.onTouched = fn; }
  setDisabledState(disabled: boolean) { this.disabled = disabled; }

  onSelect(e: Event) {
    this.value = (e.target as HTMLSelectElement).value;
    this.onChange(this.value);
  }

  get selectClasses(): string {
    return `w-full bg-bg border-[1.5px] border-border rounded-xl py-3 pl-4 pr-10 font-body text-[0.9375rem] outline-none transition duration-150 cursor-pointer appearance-none bg-no-repeat bg-[right_1rem_center] focus:bg-surface focus:border-terracotta focus:ring-[0.1875rem] focus:ring-terracotta/8 disabled:opacity-50 disabled:cursor-not-allowed ${this.value ? 'text-ink' : 'text-ink-light'}`;
  }
}
