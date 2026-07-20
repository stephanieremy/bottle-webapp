import { Component, input, computed } from '@angular/core';
import { WineType } from '../../../models/bottle.model';

const BASE_CLASSES = 'font-body text-[0.625rem] font-medium uppercase tracking-[0.07em] py-[0.1875rem] px-[0.5625rem] rounded-full inline-block';

@Component({
  selector: 'app-wine-type-badge',
  standalone: true,
  templateUrl: './wine-type-badge.component.html',
})
export class WineTypeBadgeComponent {
  type = input.required<WineType>();

  private readonly config: Record<WineType, { label: string; css: string }> = {
    RED:       { label: 'Rouge',     css: 'bg-wine-rouge-bg text-wine-rouge-text' },
    WHITE:     { label: 'Blanc',     css: 'bg-wine-blanc-bg text-wine-blanc-text' },
    PINK:      { label: 'Rosé',      css: 'bg-wine-pink-bg text-wine-pink-text' },
    SPARKLING: { label: 'Pétillant', css: 'bg-wine-petillant-bg text-wine-petillant-text' },
    CHAMPAGNE: { label: 'Champagne', css: 'bg-wine-champagne-bg text-wine-champagne-text' },
    SWEET:     { label: 'Liquoreux', css: 'bg-wine-liquoreux-bg text-wine-liquoreux-text' },
  };

  label = computed(() => this.config[this.type()]?.label ?? this.type());
  cssClass = computed(() => `${BASE_CLASSES} ${this.config[this.type()]?.css ?? ''}`);
}
