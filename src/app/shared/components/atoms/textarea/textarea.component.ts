import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-textarea',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './textarea.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TextareaComponent),
    multi: true
  }]
})
export class TextareaComponent implements ControlValueAccessor {
  @Input() placeholder = '';
  @Input() rows = 3;
  @Input() disabled = false;

  value = '';

  onChange = (_: any) => {};
  onTouched = () => {};

  writeValue(val: string) { this.value = val ?? ''; }
  registerOnChange(fn: any) { this.onChange = fn; }
  registerOnTouched(fn: any) { this.onTouched = fn; }
  setDisabledState(disabled: boolean) { this.disabled = disabled; }

  onInput(e: Event) {
    this.value = (e.target as HTMLTextAreaElement).value;
    this.onChange(this.value);
  }

  readonly textareaClasses = 'w-full resize-y bg-bg border-[1.5px] border-border rounded-xl py-3 px-4 font-notes italic text-base text-ink leading-[1.6] outline-none transition duration-150 placeholder:text-ink-light focus:bg-surface focus:border-terracotta focus:ring-[0.1875rem] focus:ring-terracotta/8';
}
