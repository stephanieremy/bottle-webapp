import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from '@storybook/test';
import { WineCardComponent } from './wine-card.component';
import { Bottle } from '../../../models/bottle.model';

const baseBottle: Bottle = {
  id: '1',
  name: 'Château Margaux',
  appellation: 'Margaux',
  region: 'BORDEAUX',
  vintage: 2015,
  type: 'RED',
  quantity: 6,
  price: 450,
  score: 96,
};

const meta: Meta<WineCardComponent> = {
  title: 'Molecules/WineCard',
  component: WineCardComponent,
  tags: ['autodocs'],
  args: {
    bottle: baseBottle,
    clicked: fn(),
  },
  decorators: [
    (story) => ({
      template: `<div style="max-width: 220px;">${story().template}</div>`,
      ...story(),
    }),
  ],
};

export default meta;
type Story = StoryObj<WineCardComponent>;

export const Red: Story = {
  args: { bottle: baseBottle },
};

export const White: Story = {
  args: {
    bottle: {
      ...baseBottle,
      id: '2',
      name: 'Chablis Grand Cru',
      appellation: 'Chablis',
      region: 'BOURGOGNE',
      vintage: 2020,
      type: 'WHITE',
      quantity: 3,
    },
  },
};

export const Pink: Story = {
  args: {
    bottle: {
      ...baseBottle,
      id: '3',
      name: 'Côtes de Provence',
      appellation: 'Provence',
      region: 'PROVENCE',
      vintage: 2023,
      type: 'PINK',
      quantity: 12,
    },
  },
};

export const Champagne: Story = {
  args: {
    bottle: {
      ...baseBottle,
      id: '4',
      name: 'Dom Pérignon',
      appellation: 'Champagne',
      region: 'CHAMPAGNE',
      vintage: 2012,
      type: 'CHAMPAGNE',
      quantity: 2,
    },
  },
};

export const NoRegion: Story = {
  args: {
    bottle: {
      ...baseBottle,
      id: '5',
      name: 'Vin de table',
      appellation: 'Vin de France',
      region: undefined,
      quantity: 1,
    },
  },
};

export const LongName: Story = {
  args: {
    bottle: {
      ...baseBottle,
      id: '6',
      name: 'Château Pichon Longueville Comtesse de Lalande',
      appellation: 'Pauillac',
      region: 'BORDEAUX',
      vintage: 2018,
      quantity: 4,
    },
  },
};

export const Grid: Story = {
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; max-width: 700px;">
        <app-wine-card [bottle]="bottles[0]" />
        <app-wine-card [bottle]="bottles[1]" />
        <app-wine-card [bottle]="bottles[2]" />
        <app-wine-card [bottle]="bottles[3]" />
      </div>
    `,
    props: {
      bottles: [
        baseBottle,
        { ...baseBottle, id: '2', name: 'Chablis Grand Cru', appellation: 'Chablis', region: 'BOURGOGNE', vintage: 2020, type: 'WHITE', quantity: 3 },
        { ...baseBottle, id: '3', name: 'Côtes de Provence', appellation: 'Provence', region: 'PROVENCE', vintage: 2023, type: 'PINK', quantity: 12 },
        { ...baseBottle, id: '4', name: 'Dom Pérignon', appellation: 'Champagne', region: 'CHAMPAGNE', vintage: 2012, type: 'CHAMPAGNE', quantity: 2 },
      ],
    },
  }),
};
