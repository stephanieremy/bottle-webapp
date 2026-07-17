import {WineRegion} from './wine-region.model';

export type WineType = 'RED' | 'WHITE' | 'PINK' | 'SPARKLING' | 'CHAMPAGNE' | 'SWEET';

export interface Bottle {
  id: string;
  name: string;
  appellation: string;
  region?: WineRegion | string;
  customRegion?: string;
  vintage: number;
  type: WineType;
  quantity: number;
  notes?: string;
  price?: number;
  score?: number;
  creationDate?: Date;
}
