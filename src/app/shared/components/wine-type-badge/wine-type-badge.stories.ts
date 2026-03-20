import type { Meta, StoryObj } from '@storybook/angular';
import { WineTypeBadgeComponent } from './wine-type-badge.component';

const meta: Meta<WineTypeBadgeComponent> = {
  title: 'Atoms/WineTypeBadge',
  component: WineTypeBadgeComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<WineTypeBadgeComponent>;

export const Overview: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <app-wine-type-badge type="RED" />
        <app-wine-type-badge type="WHITE" />
        <app-wine-type-badge type="PINK" />
        <app-wine-type-badge type="SPARKLING" />
        <app-wine-type-badge type="CHAMPAGNE" />
        <app-wine-type-badge type="MUTED" />
      </div>
    `,
  }),
};
