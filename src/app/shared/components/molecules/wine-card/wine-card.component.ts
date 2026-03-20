import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Bottle } from '../../../models/bottle.model';
import {WineTypeBadgeComponent} from '../../atoms/wine-type-badge/wine-type-badge.component';

@Component({
  selector: 'app-wine-card',
  standalone: true,
  imports: [CommonModule, WineTypeBadgeComponent],
  templateUrl: './wine-card.component.html',
  styleUrl: './wine-card.component.scss'
})
export class WineCardComponent {
  @Input() bottle!: Bottle;
  @Output() clicked = new EventEmitter<Bottle>();
}
