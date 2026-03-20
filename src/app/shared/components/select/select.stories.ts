import type { Meta, StoryObj } from '@storybook/angular';
import { SelectComponent } from './select.component';

const meta: Meta<SelectComponent> = {
  title: 'Atoms/Select',
  component: SelectComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<SelectComponent>;

export const Default: Story = {
  args: {
    placeholder: 'Sélectionner un type',
    options: [
      { value: 'RED', label: 'Rouge' },
      { value: 'WHITE', label: 'Blanc' },
      { value: 'ROSE', label: 'Rosé' },
      { value: 'SPARKLING', label: 'Pétillant' },
      { value: 'MUTED', label: 'Muté' },
    ],
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Désactivé',
    disabled: true,
    options: [{ value: 'RED', label: 'Rouge' }],
  },
};
