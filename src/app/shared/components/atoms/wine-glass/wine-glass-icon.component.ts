import { Component, computed, input } from '@angular/core';
import { WineType } from '../../../models/bottle.model';

interface WineGlassStyle {
  liquid: string;
  stroke: string;
  isFlute: boolean;
}

const WINE_GLASS_STYLES: Record<WineType, WineGlassStyle> = {
  RED:        { liquid: '#A3341A', stroke: '#8A2A10', isFlute: false },
  WHITE:      { liquid: '#E3C878', stroke: '#7A5A10', isFlute: false },
  PINK:       { liquid: '#E8A0B4', stroke: '#8A2848', isFlute: false },
  SPARKLING:  { liquid: '#BFE0C8', stroke: '#3D7A58', isFlute: true },
  CHAMPAGNE:  { liquid: '#E8DFA0', stroke: '#3D4F9E', isFlute: true },
  SWEET:      { liquid: '#D8A85C', stroke: '#7A4A08', isFlute: false },
};

@Component({
  selector: 'app-wine-glass-icon',
  standalone: true,
  templateUrl: './wine-glass-icon.component.html',
  host: { class: 'inline-flex shrink-0' },
})
export class WineGlassIconComponent {
  type = input.required<WineType>();
  size = input<number>(32);

  style = computed<WineGlassStyle>(() => WINE_GLASS_STYLES[this.type()]);
}
