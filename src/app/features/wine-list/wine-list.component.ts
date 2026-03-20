import { Component, OnInit, inject, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { BottleService } from '../../core/services/bottle.service';
import { WineCardComponent } from '../../shared/components/molecules/wine-card/wine-card.component';
import { StatCellComponent } from '../../shared/components/molecules/stat-cell/stat-cell.component';
import { Bottle, WineType } from '../../shared/models/bottle.model';

@Component({
  selector: 'app-wine-list',
  standalone: true,
  imports: [NgClass, WineCardComponent, StatCellComponent],
  templateUrl: './wine-list.component.html',
  styleUrl: './wine-list.component.scss'
})
export class WineListComponent implements OnInit {
  private bottleService = inject(BottleService);
  private router = inject(Router);

  bottles = signal<Bottle[]>([]);
  filteredBottles = signal<Bottle[]>([]);
  selectedType = signal<WineType | null>(null);
  searchQuery = signal('');

  readonly types: { value: WineType; label: string }[] = [
    { value: 'RED', label: 'Rouge' },
    { value: 'WHITE', label: 'Blanc' },
    { value: 'PINK', label: 'Rosé' },
    { value: 'SPARKLING', label: 'Pétillant' },
    { value: 'CHAMPAGNE', label: 'Champagne' },
    { value: 'MUTED', label: 'Liquoreux' },
  ];

  ngOnInit() {
    this.bottleService.getAll().subscribe(bottles => {
      this.bottles.set(bottles);
      this.filteredBottles.set(bottles);
    });
  }

  get totalBottles(): number {
    return this.bottles().reduce((sum, b) => sum + b.quantity, 0);
  }

  get totalAppellations(): number {
    return new Set(this.bottles().map(b => b.designation)).size;
  }

  get totalVintages(): number {
    return new Set(this.bottles().map(b => b.vintage)).size;
  }

  filterByType(type: WineType | null) {
    this.selectedType.set(type);
    this.applyFilters();
  }

  onSearch(event: Event) {
    this.searchQuery.set((event.target as HTMLInputElement).value);
    this.applyFilters();
  }

  private applyFilters() {
    let result = this.bottles();
    if (this.selectedType()) {
      result = result.filter(b => b.type === this.selectedType());
    }
    if (this.searchQuery()) {
      const q = this.searchQuery().toLowerCase();
      result = result.filter(b =>
        b.name.toLowerCase().includes(q) ||
        b.designation.toLowerCase().includes(q)
      );
    }
    this.filteredBottles.set(result);
  }

  onCardClick(bottle: Bottle) {
    this.router.navigate(['/bottles', bottle.id]);
  }

  onAddClick() {
    this.router.navigate(['/bottles/new']);
  }
}
