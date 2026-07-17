import { Component, input, output } from '@angular/core';
import { Bottle } from '../../../models/bottle.model';
import { WineTypeBadgeComponent } from '../../atoms/wine-type-badge/wine-type-badge.component';
import { WineGlassIconComponent } from '../../atoms/wine-glass/wine-glass-icon.component';

@Component({
  selector: 'app-wine-card',
  standalone: true,
  imports: [WineTypeBadgeComponent, WineGlassIconComponent],
  templateUrl: './wine-card.component.html',
  styleUrl: './wine-card.component.scss',
})
export class WineCardComponent {
  bottle = input.required<Bottle>();
  clicked = output<Bottle>();
}
