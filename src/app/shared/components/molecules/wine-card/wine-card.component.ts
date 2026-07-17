import { Component, computed, input, output } from '@angular/core';
import { Bottle } from '../../../models/bottle.model';
import { WineTypeBadgeComponent } from '../../atoms/wine-type-badge/wine-type-badge.component';
import { WineGlassIconComponent } from '../../atoms/wine-glass/wine-glass-icon.component';
import { WINE_REGION_LABELS, WineRegion } from '../../../models/wine-region.model';

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

  regionLabel = computed(() => {
    const region = this.bottle().region;
    return region ? (WINE_REGION_LABELS[region as WineRegion] ?? region) : undefined;
  });
}
