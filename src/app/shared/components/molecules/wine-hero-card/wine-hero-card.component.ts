import { Component, input } from '@angular/core';
import { Bottle } from '../../../models/bottle.model';

import { StatCellComponent } from '../stat-cell/stat-cell.component';
import {WineTypeBadgeComponent} from '../../atoms/wine-type-badge/wine-type-badge.component';

@Component({
  selector: 'app-wine-hero-card',
  standalone: true,
  imports: [WineTypeBadgeComponent, StatCellComponent],
  templateUrl: './wine-hero-card.component.html',
  styleUrl: './wine-hero-card.component.scss'
})
export class WineHeroCardComponent {
  bottle = input.required<Bottle>();
}
