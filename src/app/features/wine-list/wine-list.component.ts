import { Component, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { BottleService } from '../../core/services/bottle.service';
import { WineCardComponent } from '../../shared/components/molecules/wine-card/wine-card.component';
import { StatCellComponent } from '../../shared/components/molecules/stat-cell/stat-cell.component';
import { Bottle, WineType } from '../../shared/models/bottle.model';

const FILTER_PILL_BASE = 'rounded-full py-[0.4375rem] px-4 text-xs font-medium cursor-pointer border-[1.5px] font-body transition duration-150';

const TYPE_PILL_CLASSES: Record<WineType, string> = {
  RED: 'bg-wine-rouge-bg text-wine-rouge-text border-wine-rouge-bg',
  WHITE: 'bg-wine-blanc-bg text-wine-blanc-text border-wine-blanc-bg',
  PINK: 'bg-wine-pink-bg text-wine-pink-text border-wine-pink-bg',
  SPARKLING: 'bg-wine-petillant-bg text-wine-petillant-text border-wine-petillant-bg',
  CHAMPAGNE: 'bg-wine-champagne-bg text-wine-champagne-text border-wine-champagne-bg',
  SWEET: 'bg-wine-liquoreux-bg text-wine-liquoreux-text border-wine-liquoreux-bg',
};

@Component({
  selector: 'app-wine-list',
  standalone: true,
  imports: [WineCardComponent, StatCellComponent],
  templateUrl: './wine-list.component.html',
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
    { value: 'SWEET', label: 'Liquoreux' },
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
    return new Set(this.bottles().map(b => b.appellation)).size;
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
        b.appellation.toLowerCase().includes(q)
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

  get allPillClasses(): string {
    return `${FILTER_PILL_BASE} ${this.selectedType() === null ? 'bg-surface text-terracotta border-terracotta' : 'bg-surface text-ink-mid border-border'}`;
  }

  typePillClasses(type: WineType): string {
    return `${FILTER_PILL_BASE} ${TYPE_PILL_CLASSES[type]}`;
  }
}
