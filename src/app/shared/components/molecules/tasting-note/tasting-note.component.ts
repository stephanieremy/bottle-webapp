import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tasting-note',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tasting-note.component.html',
  styleUrl: './tasting-note.component.scss'
})
export class TastingNoteComponent {
  @Input() note!: string;
}
