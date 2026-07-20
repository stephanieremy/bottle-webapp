import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { ButtonComponent, ButtonVariant, ButtonSize } from './button.component';

@Component({
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <app-button [variant]="variant" [size]="size" [disabled]="disabled" (clicked)="onClicked()">
      Confirmer
    </app-button>
  `,
})
class HostComponent {
  variant: ButtonVariant = 'primary';
  size: ButtonSize = 'md';
  disabled = false;
  onClicked = jest.fn();
}

describe('ButtonComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;
  let button: HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
    button = fixture.nativeElement.querySelector('button');
  });

  it('should render the button with projected content', () => {
    expect(button).toBeTruthy();
    expect(button.textContent?.trim()).toBe('Confirmer');
  });

  it('should apply variant and size classes', () => {
    expect(button.className).toContain('bg-terracotta');
    expect(button.className).toContain('py-3');
  });

  it('should update classes when variant changes', () => {
    host.variant = 'danger';
    fixture.detectChanges();
    expect(button.className).toContain('bg-error');
  });

  it('should update classes when size changes', () => {
    host.size = 'lg';
    fixture.detectChanges();
    expect(button.className).toContain('py-4');
  });

  it('should emit clicked when clicked and not disabled', () => {
    button.click();
    expect(host.onClicked).toHaveBeenCalledTimes(1);
  });

  it('should not emit clicked when disabled', () => {
    host.disabled = true;
    fixture.detectChanges();
    button.click();
    expect(host.onClicked).not.toHaveBeenCalled();
  });

  it('should set the disabled attribute when disabled', () => {
    host.disabled = true;
    fixture.detectChanges();
    expect(button.disabled).toBe(true);
  });

  it('should not be disabled by default', () => {
    expect(button.disabled).toBe(false);
  });
});
