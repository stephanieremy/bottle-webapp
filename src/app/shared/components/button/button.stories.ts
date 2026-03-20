import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from './button.component';

const meta: Meta<ButtonComponent> = {
  title: 'Atoms/Button',
  component: ButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'sage', 'danger'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
  render: (args) => ({
    props: args,
    template: `<app-button [variant]="variant" [size]="size" [disabled]="disabled">Ajouter un vin</app-button>`,
  }),
};

export default meta;
type Story = StoryObj<ButtonComponent>;

export const Primary: Story = { args: { variant: 'primary', size: 'md' } };
export const Secondary: Story = { args: { variant: 'secondary', size: 'md' } };
export const Ghost: Story = { args: { variant: 'ghost', size: 'md' } };
export const Sage: Story = { args: { variant: 'sage', size: 'md' } };
export const Danger: Story = { args: { variant: 'danger', size: 'md' } };
export const Small: Story = { args: { variant: 'primary', size: 'sm' } };
export const Large: Story = { args: { variant: 'primary', size: 'lg' } };
export const Disabled: Story = { args: { variant: 'primary', disabled: true } };
