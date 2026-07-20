import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './input.component';

@Component({
  standalone: true,
  imports: [InputComponent, ReactiveFormsModule],
  template: `
    <app-input
      [placeholder]="placeholder"
      [type]="type"
      [error]="error"
      [formControl]="control"
    />
  `,
})
class HostComponent {
  placeholder = 'Nom du vin';
  type = 'text';
  error = false;
  control = new FormControl('');
}

describe('InputComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;
  let input: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
    input = fixture.nativeElement.querySelector('input');
  });

  it('should render an input element', () => {
    expect(input).toBeTruthy();
  });

  it('should apply the placeholder', () => {
    expect(input.placeholder).toBe('Nom du vin');
  });

  it('should apply the type', () => {
    host.type = 'number';
    fixture.detectChanges();
    expect(input.type).toBe('number');
  });

  it('should reflect the formControl value', () => {
    host.control.setValue('Château Margaux');
    fixture.detectChanges();
    expect(input.value).toBe('Château Margaux');
  });

  it('should update the formControl when the user types', () => {
    input.value = 'Pomerol';
    input.dispatchEvent(new Event('input'));
    expect(host.control.value).toBe('Pomerol');
  });

  it('should apply the error border class when error is true', () => {
    host.error = true;
    fixture.detectChanges();
    expect(input.classList.contains('border-error')).toBe(true);
  });

  it('should not have the error border class by default', () => {
    expect(input.classList.contains('border-error')).toBe(false);
  });

  it('should mark the control as touched on focus', () => {
    expect(host.control.touched).toBe(false);

    input.dispatchEvent(new Event('focus'));
    fixture.detectChanges();
    expect(host.control.touched).toBe(true);
  });

  it('should disable the input when formControl is disabled', () => {
    host.control = new FormControl({ value: '', disabled: true });
    fixture.detectChanges();
    expect(input.disabled).toBe(true);
  });
});
