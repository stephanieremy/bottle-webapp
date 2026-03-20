import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WineType } from '../../../models/bottle.model';

@Component({
  selector: 'app-wine-type-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wine-type-badge.component.html',
  styleUrl: './wine-type-badge.component.scss'
})
export class WineTypeBadgeComponent {
  @Input() type!: WineType;

  private readonly config: Record<WineType, { label: string; css: string }> = {
    RED:       { label: 'Rouge',     css: 'rouge' },
    WHITE:     { label: 'Blanc',     css: 'blanc' },
    PINK:      { label: 'Rosé',      css: 'pink' },
    SPARKLING: { label: 'Pétillant', css: 'petillant' },
    CHAMPAGNE: { label: 'Champagne', css: 'champagne' },
    MUTED:     { label: 'Liquoreux', css: 'liquoreux' },
  };

  get label(): string { return this.config[this.type]?.label ?? this.type; }
  get cssClass(): string { return this.config[this.type]?.css ?? ''; }
}
