import type { Meta, StoryObj } from '@storybook/angular';
import { TextareaComponent } from './textarea.component';

const meta: Meta<TextareaComponent> = {
  title: 'Atoms/Textarea',
  component: TextareaComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<TextareaComponent>;

export const Default: Story = {
  args: {
    placeholder: 'Velours et graphite, finale infinie et précise…',
    rows: 3,
  },
};

export const LargeRows: Story = {
  args: {
    placeholder: 'Notes de dégustation…',
    rows: 6,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Désactivé',
    disabled: true,
  },
};
