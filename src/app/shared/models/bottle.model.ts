export type WineType = 'RED' | 'WHITE' | 'ROSÉ' | 'SPARKLING' | 'MUTED';

export interface Bottle {
  id: string;
  name: string;
  designation: string;
  vintage: number;
  type: WineType;
  quantity: number;
  notes?: string;
}
