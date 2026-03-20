import type { Meta, StoryObj } from '@storybook/angular';
import { InputComponent } from './input.component';

const meta: Meta<InputComponent> = {
  title: 'Atoms/Input',
  component: InputComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<InputComponent>;

export const Default: Story = { args: { placeholder: 'Ex. Château Margaux' } };
export const WithError: Story = { args: { placeholder: 'Champ requis', error: true } };
export const Disabled: Story = { args: { placeholder: 'Désactivé', disabled: true } };
