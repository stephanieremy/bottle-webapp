export type WineType = 'RED' | 'WHITE' | 'PINK' | 'SPARKLING' | 'CHAMPAGNE' | 'MUTED';

export interface Bottle {
  id: string;
  name: string;
  designation: string;
  vintage: number;
  type: WineType;
  quantity: number;
  notes?: string;
}
