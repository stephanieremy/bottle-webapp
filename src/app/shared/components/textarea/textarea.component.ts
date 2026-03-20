import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-textarea',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.scss',
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
  focused = false;

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
}
