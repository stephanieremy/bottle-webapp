import { Component, input, computed } from '@angular/core';
import {DrinkingStatus, VintageMaturity} from '../../../../core/services/vintage-maturity.service';

@Component({
  selector: 'app-peak-window',
  standalone: true,
  templateUrl: './peak-window.component.html',
  styleUrl: './peak-window.component.scss'
})
export class PeakWindowComponent {
  status = input.required<DrinkingStatus>();
  maturity = input<VintageMaturity>();
  vintage = input.required<number>();

  readonly config = {
    'not-ready':  { label: 'Pas encore prêt',  dot: '#A67C2E', bg: '#EDE0B0', text: '#7A5A10' },
    'ready':      { label: 'À son apogée',      dot: '#3D7A58', bg: '#C4E0D0', text: '#3D7A58' },
    'past-peak':  { label: 'Passé son apogée',  dot: '#B83020', bg: '#F5DDD8', text: '#B83020' },
    'unknown':    { label: 'Non répertorié',    dot: '#A89880', bg: '#EDE7D9', text: '#A89880' },
  };

  style = computed(() => this.config[this.status()]);
}
