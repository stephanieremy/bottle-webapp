import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { BottleService } from '../../core/services/bottle.service';
import { WineType } from '../../shared/models/bottle.model';
import { InputComponent } from '../../shared/components/atoms/input/input.component';
import {ButtonComponent} from '../../shared/components/atoms/button/button.component';
import {SelectComponent} from '../../shared/components/atoms/select/select.component';
import {WINE_REGION_OPTIONS, WineRegion} from '../../shared/models/wine-region.model';

@Component({
  selector: 'app-wine-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, InputComponent, ButtonComponent, SelectComponent],
  templateUrl: './wine-form.component.html',
  styleUrl: './wine-form.component.scss'
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

  onSubmit() {
    if (this.form.invalid) return;
    const { customRegion, ...rest } = this.form.value;
    const payload = {
      ...rest,
      vintage: Number(this.form.value.vintage),
      quantity: this.quantity(),
      region: this.showCustomRegion() ? customRegion : rest.region,
    };
    this.bottleService.create(payload as any).subscribe(() => {
      this.router.navigate(['/bottles']);
    });
  }
}
