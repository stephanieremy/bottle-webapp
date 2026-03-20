import { Component, input, computed } from '@angular/core';
import { WineType } from '../../../models/bottle.model';

@Component({
  selector: 'app-wine-type-badge',
  standalone: true,
  templateUrl: './wine-type-badge.component.html',
  styleUrl: './wine-type-badge.component.scss'
})
export class WineTypeBadgeComponent {
  type = input.required<WineType>();

  private readonly config: Record<WineType, { label: string; css: string }> = {
    RED:       { label: 'Rouge',     css: 'rouge' },
    WHITE:     { label: 'Blanc',     css: 'blanc' },
    PINK:      { label: 'Rosé',      css: 'rose' },
    SPARKLING: { label: 'Pétillant', css: 'petillant' },
    CHAMPAGNE: { label: 'Champagne', css: 'champagne' },
    MUTED:     { label: 'Liquoreux', css: 'liquoreux' },
  };

  label = computed(() => this.config[this.type()]?.label ?? this.type());
  cssClass = computed(() => this.config[this.type()]?.css ?? '');
}
