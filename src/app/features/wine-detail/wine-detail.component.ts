import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BottleService } from '../../core/services/bottle.service';
import { Bottle } from '../../shared/models/bottle.model';
import { WineHeroCardComponent } from '../../shared/components/molecules/wine-hero-card/wine-hero-card.component';
import { TastingNoteComponent } from '../../shared/components/molecules/tasting-note/tasting-note.component';
import { ButtonComponent } from '../../shared/components/atoms/button/button.component';
import {VintageChartService, VintageStatus} from '../../core/services/vintage-maturity.service';
import {PeakWindowComponent} from '../../shared/components/molecules/peak-window/peak-window.component';

@Component({
  selector: 'app-wine-detail',
  standalone: true,
  imports: [RouterModule, WineHeroCardComponent, TastingNoteComponent, ButtonComponent, PeakWindowComponent],
  templateUrl: './wine-detail.component.html',
  styleUrl: './wine-detail.component.scss'
})
export class WineDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private bottleService = inject(BottleService);
  private vintageChartService = inject(VintageChartService);

  bottle = signal<Bottle | null>(null);
  vintageStatus = signal<VintageStatus>({ status: 'unknown' });

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.bottleService.getById(id).subscribe(b => {
      this.bottle.set(b);
      if (b.region && b.vintage) {
        this.vintageStatus.set(
          this.vintageChartService.getStatus(b.region, b.vintage)
        );
      }
    });
  }

  onEdit() {
    this.router.navigate(['/bottles', this.bottle()?.id, 'edit']);
  }

  onDelete() {
    if (!confirm('Supprimer ce vin ?')) return;
    this.bottleService.delete(this.bottle()!.id).subscribe(() => {
      this.router.navigate(['/bottles']);
    });
  }

  onBack() {
    this.router.navigate(['/bottles']);
  }
}
