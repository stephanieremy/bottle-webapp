import { Component, input } from '@angular/core';

@Component({
  selector: 'app-stat-cell',
  standalone: true,
  templateUrl: './stat-cell.component.html',
  styleUrl: './stat-cell.component.scss'
})
export class StatCellComponent {
  label = input.required<string>();
  value = input.required<string>();
  color = input<string>();
  small = input<boolean>(false);
  border = input<boolean>(false);
}
