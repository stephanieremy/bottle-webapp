import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {firstValueFrom} from 'rxjs';
import { WineRegion } from '../../shared/models/wine-region.model';

export type VintageMaturity = 'T' | 'E' | 'R' | 'I' | 'C' | 'NT';

export interface VintageInfo {
  score: number;
  maturity: VintageMaturity;
}

export type DrinkingStatus = 'not-ready' | 'ready' | 'past-peak' | 'unknown';

export interface VintageStatus {
  status: DrinkingStatus;
  score?: number;
  maturity?: VintageMaturity;
}

@Injectable({ providedIn: 'root' })
export class VintageChartService {
  private http = inject(HttpClient);
  private chart: Record<string, Record<string, VintageInfo>> = {};

  loadChart(): Promise<void> {
    return firstValueFrom(
      this.http.get<Record<string, Record<string, VintageInfo>>>('assets/vintage-chart.json')
    ).then(data => { this.chart = data; });
  }

  getStatus(region: WineRegion | string, vintage: number): VintageStatus {
    const regionData = this.chart[region];
    if (!regionData) return { status: 'unknown' };

    const info = regionData[String(vintage)];
    if (!info) return { status: 'unknown' };

    return {
      score: info.score,
      maturity: info.maturity,
      status: this.maturityToStatus(info.maturity),
    };
  }

  private maturityToStatus(maturity: VintageMaturity): DrinkingStatus {
    switch (maturity) {
      case 'T': return 'not-ready';
      case 'E':
      case 'R': return 'ready';
      case 'C': return 'past-peak';
      default:  return 'unknown';
    }
  }
}
