import type { Meta, StoryObj } from '@storybook/angular';
import { WineHeroCardComponent } from './wine-hero-card.component';

const meta: Meta<WineHeroCardComponent> = {
  title: 'Molecules/WineHeroCard',
  component: WineHeroCardComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<WineHeroCardComponent>;

const demoBottle = {
  id: '1',
  name: 'Château Margaux',
  appellation: 'Margaux 1er Grand Cru Classé',
  type: 'RED' as const,
  vintage: 2016,
  quantity: 6,
  price: 380,
  score: 97,
};

export const Default: Story = {
  render: () => ({
    props: { bottle: demoBottle },
    template: `<div style="max-width: 800px"><app-wine-hero-card [bottle]="bottle" /></div>`,
  }),
};

export const SansScore: Story = {
  render: () => ({
    props: { bottle: { ...demoBottle, score: null } },
    template: `<div style="max-width: 800px"><app-wine-hero-card [bottle]="bottle" /></div>`,
  }),
};

export const Champagne: Story = {
  render: () => ({
    props: { bottle: { ...demoBottle, name: 'Dom Pérignon', appellation: 'Champagne Brut', type: 'CHAMPAGNE', vintage: 2018, price: 220, score: 95 } },
    template: `<div style="max-width: 800px"><app-wine-hero-card [bottle]="bottle" /></div>`,
  }),
};
