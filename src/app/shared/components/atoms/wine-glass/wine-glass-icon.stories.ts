import type { Meta, StoryObj } from '@storybook/angular';
import { WineGlassIconComponent } from './wine-glass-icon.component';
import { WineType } from '../../../models/bottle.model';

const meta: Meta<WineGlassIconComponent> = {
  title: 'Atoms/WineGlassIcon',
  component: WineGlassIconComponent,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['RED', 'WHITE', 'PINK', 'SPARKLING', 'CHAMPAGNE', 'SWEET'] satisfies WineType[],
    },
    size: {
      control: { type: 'number', min: 16, max: 64, step: 4 },
    },
  },
  args: {
    type: 'RED',
    size: 32,
  },
};

export default meta;
type Story = StoryObj<WineGlassIconComponent>;

export const Red: Story = {
  args: { type: 'RED' },
};

export const White: Story = {
  args: { type: 'WHITE' },
};

export const Pink: Story = {
  args: { type: 'PINK' },
};

export const Sparkling: Story = {
  args: { type: 'SPARKLING' },
};

export const Champagne: Story = {
  args: { type: 'CHAMPAGNE' },
};

export const Sweet: Story = {
  args: { type: 'SWEET' },
};

export const Large: Story = {
  args: { type: 'RED', size: 56 },
};

export const AllTypes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; align-items: center;">
        <app-wine-glass-icon type="RED" [size]="32" />
        <app-wine-glass-icon type="WHITE" [size]="32" />
        <app-wine-glass-icon type="PINK" [size]="32" />
        <app-wine-glass-icon type="SPARKLING" [size]="32" />
        <app-wine-glass-icon type="CHAMPAGNE" [size]="32" />
        <app-wine-glass-icon type="SWEET" [size]="32" />
      </div>
    `,
  }),
};
