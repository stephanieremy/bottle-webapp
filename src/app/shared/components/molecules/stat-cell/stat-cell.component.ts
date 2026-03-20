import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stat-cell',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stat-cell.component.html',
  styleUrl: './stat-cell.component.scss'
})
export class StatCellComponent {
  @Input() label!: string;
  @Input() value!: string;
  @Input() color?: string;
  @Input() small = false;
  @Input() border = false;
}
