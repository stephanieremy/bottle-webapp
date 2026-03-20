import type { Meta, StoryObj } from '@storybook/angular';
import { TastingNoteComponent } from './tasting-note.component';

const meta: Meta<TastingNoteComponent> = {
  title: 'Molecules/TastingNote',
  component: TastingNoteComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<TastingNoteComponent>;

export const Default: Story = {
  args: {
    note: 'Velours et graphite, finale infinie et précise.',
  },
};

export const Long: Story = {
  args: {
    note: 'Robe grenat profond aux reflets violacés. Nez complexe mêlant fruits noirs, épices douces et notes boisées. Bouche ample et soyeuse, tanins fondus, finale persistante.',
  },
};
