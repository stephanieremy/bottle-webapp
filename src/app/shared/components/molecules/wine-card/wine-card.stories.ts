import type { Meta, StoryObj } from '@storybook/angular';
import { WineCardComponent } from './wine-card.component';

const meta: Meta<WineCardComponent> = {
  title: 'Molecules/WineCard',
  component: WineCardComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<WineCardComponent>;

const demoBottle = {
  id: '1',
  name: 'Château Margaux',
  designation: 'Margaux 1er Grand Cru',
  type: 'RED' as const,
  vintage: 2016,
  quantity: 6,
};

export const Overview: Story = {
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(3, 200px); gap: 14px;">
        <app-wine-card [bottle]="rouge" />
        <app-wine-card [bottle]="blanc" />
        <app-wine-card [bottle]="champagne" />
      </div>
    `,
    props: {
      rouge: { id: '1', name: 'Château Margaux', designation: 'Margaux 1er Grand Cru', type: 'RED', vintage: 2016, quantity: 6 },
      blanc: { id: '2', name: 'Puligny-Montrachet', designation: '1er Cru Les Pucelles', type: 'WHITE', vintage: 2019, quantity: 3 },
      champagne: { id: '3', name: 'Dom Pérignon', designation: 'Champagne Brut', type: 'CHAMPAGNE', vintage: 2018, quantity: 1 },
    },
  }),
};

export const Rouge: Story = {
  render: () => ({
    template: `
      <div style="width: 200px;">
        <app-wine-card [bottle]="bottle" />
      </div>
    `,
    props: {
      bottle: { id: '1', name: 'Château Margaux', designation: 'Margaux 1er Grand Cru', type: 'RED', vintage: 2016, quantity: 6 },
    },
  }),
};

export const Blanc: Story = {
  render: () => ({
    template: `
      <div style="width: 200px;">
        <app-wine-card [bottle]="bottle" />
      </div>
    `,
    props: {
      bottle: { id: '2', name: 'Puligny-Montrachet', designation: '1er Cru Les Pucelles', type: 'WHITE', vintage: 2019, quantity: 3 },
    },
  }),
};

export const Champagne: Story = {
  render: () => ({
    template: `
      <div style="width: 200px;">
        <app-wine-card [bottle]="bottle" />
      </div>
    `,
    props: {
      bottle: { id: '3', name: 'Dom Pérignon', designation: 'Champagne Brut', type: 'CHAMPAGNE', vintage: 2018, quantity: 1 },
    },
  }),
};

export const Liquoreux: Story = {
  render: () => ({
    template: `
      <div style="width: 200px;">
        <app-wine-card [bottle]="bottle" />
      </div>
    `,
    props: {
      bottle: { id: '4', name: "Sauternes d'Yquem", designation: '1er Cru Supérieur', type: 'MUTED', vintage: 2011, quantity: 1 },
    },
  }),
};
