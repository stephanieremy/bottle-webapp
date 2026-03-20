import type { Meta, StoryObj } from '@storybook/angular';
import { StatCellComponent } from './stat-cell.component';

const meta: Meta<StatCellComponent> = {
  title: 'Molecules/StatCell',
  component: StatCellComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<StatCellComponent>;

export const Overview: Story = {
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; background: #FDFAF5; border: 1px solid #DDD4C0; border-radius: 16px; overflow: hidden;">
        <app-stat-cell label="Bouteilles" value="24" color="#C4522A" [border]="true" />
        <app-stat-cell label="Appellations" value="6" color="#3D7A58" [border]="true" />
        <app-stat-cell label="Millésimes" value="8" color="#A67C2E" />
      </div>
    `,
  }),
};

export const Default: Story = {
  args: { label: 'Bouteilles', value: '24' },
};

export const WithColor: Story = {
  args: { label: 'Bouteilles', value: '24', color: '#C4522A' },
};

export const Small: Story = {
  args: { label: 'Type dominant', value: 'Rouge', small: true },
};
