import type { Meta, StoryObj } from '@storybook/angular';
import { PeakWindowComponent } from './peak-window.component';

const meta: Meta<PeakWindowComponent> = {
  title: 'Molecules/PeakWindow',
  component: PeakWindowComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<PeakWindowComponent>;

export const Overview: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px; padding: 16px;">
        <app-peak-window status="not-ready" [vintage]="2020" maturity="T" />
        <app-peak-window status="ready" [vintage]="2016" maturity="R" />
        <app-peak-window status="past-peak" [vintage]="2005" maturity="C" />
        <app-peak-window status="unknown" [vintage]="2018" />
      </div>
    `,
  }),
};

export const NotReady: Story = {
  args: { status: 'not-ready', vintage: 2020, maturity: 'T' },
};

export const Ready: Story = {
  args: { status: 'ready', vintage: 2016, maturity: 'R' },
};

export const PastPeak: Story = {
  args: { status: 'past-peak', vintage: 2005, maturity: 'C' },
};

export const Unknown: Story = {
  args: { status: 'unknown', vintage: 2018 },
};
