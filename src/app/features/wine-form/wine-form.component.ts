import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { BottleService } from '../../core/services/bottle.service';
import { WineType } from '../../shared/models/bottle.model';
import { InputComponent } from '../../shared/components/atoms/input/input.component';
import {ButtonComponent} from '../../shared/components/atoms/button/button.component';
import {SelectComponent} from '../../shared/components/atoms/select/select.component';
import {WINE_REGION_OPTIONS, WineRegion} from '../../shared/models/wine-region.model';

const TYPE_PILL_BASE = 'rounded-full py-2 px-4 text-[0.8125rem] font-body cursor-pointer border-[1.5px] border-border bg-bg text-ink-mid transition duration-150 hover:border-border-strong';

const TYPE_PILL_SELECTED: Record<WineType, string> = {
  RED: 'bg-wine-rouge-bg text-wine-rouge-text border-wine-rouge-text font-medium',
  WHITE: 'bg-wine-blanc-bg text-wine-blanc-text border-wine-blanc-text font-medium',
  PINK: 'bg-wine-pink-bg text-wine-pink-text border-wine-pink-text font-medium',
  SPARKLING: 'bg-wine-petillant-bg text-wine-petillant-text border-wine-petillant-text font-medium',
  CHAMPAGNE: 'bg-wine-champagne-bg text-wine-champagne-text border-wine-champagne-text font-medium',
  SWEET: 'bg-wine-liquoreux-bg text-wine-liquoreux-text border-wine-liquoreux-text font-medium',
};

@Component({
  selector: 'app-wine-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, InputComponent, ButtonComponent, SelectComponent],
  templateUrl: './wine-form.component.html',
})
export class WineFormComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private bottleService = inject(BottleService);

  quantity = signal(1);

  readonly types: { value: WineType; label: string }[] = [
    { value: 'RED',       label: 'Rouge'     },
    { value: 'WHITE',     label: 'Blanc'     },
    { value: 'PINK',      label: 'Rosé'      },
    { value: 'SPARKLING', label: 'Pétillant' },
    { value: 'CHAMPAGNE', label: 'Champagne' },
    { value: 'SWEET',     label: 'Liquoreux' },
  ];

  readonly vintages = Array.from(
    { length: new Date().getFullYear() - 1900 + 1 },
    (_, i) => new Date().getFullYear() - i
  ).map(y => ({ value: String(y), label: String(y) }));

  readonly regions = WINE_REGION_OPTIONS;
  showCustomRegion = signal(false);

  form = this.fb.group({
    name:        ['', Validators.required],
    appellation: ['', Validators.required],
    vintage:     [null as string | null, Validators.required],
    type:        [null as WineType | null, Validators.required],
    region:      [null as string | null],
    customRegion:[''],
    price:       [null as number | null, Validators.min(0)],
  });

  onRegionChange(value: string) {
    this.showCustomRegion.set(value === WineRegion.OTHER);
    if (value !== WineRegion.OTHER) {
      this.form.patchValue({ customRegion: '' });
    }
  }

  increment() { this.quantity.update(q => q + 1); }
  decrement() { if (this.quantity() > 1) this.quantity.update(q => q - 1); }
  selectType(type: WineType) { this.form.patchValue({ type }); }
  onCancel() { this.router.navigate(['/bottles']); }

  typePillClasses(type: WineType): string {
    const selected = this.form.value.type === type;
    return `${TYPE_PILL_BASE} ${selected ? TYPE_PILL_SELECTED[type] : ''}`;
  }

  onSubmit() {
    if (this.form.invalid) return;
    const { customRegion, ...rest } = this.form.value;
    const payload = {
      ...rest,
      vintage: Number(this.form.value.vintage),
      quantity: this.quantity(),
      region: this.showCustomRegion() ? WineRegion.OTHER : rest.region,
      customRegion: this.showCustomRegion() ? customRegion : null,
    };
    this.bottleService.create(payload as any).subscribe(() => {
      this.router.navigate(['/bottles']);
    });
  }
}
