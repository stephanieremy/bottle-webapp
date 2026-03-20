import { Component, input, output } from '@angular/core';
import { Bottle } from '../../../models/bottle.model';
import {WineTypeBadgeComponent} from '../../atoms/wine-type-badge/wine-type-badge.component';

@Component({
  selector: 'app-wine-card',
  standalone: true,
  imports: [WineTypeBadgeComponent],
  templateUrl: './wine-card.component.html',
  styleUrl: './wine-card.component.scss'
})
export class WineCardComponent {
  bottle = input.required<Bottle>();
  clicked = output<Bottle>();
}
