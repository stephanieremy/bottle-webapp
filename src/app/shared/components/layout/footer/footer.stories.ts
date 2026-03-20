import {applicationConfig, Meta, StoryObj} from '@storybook/angular';
import { FooterComponent } from './footer.component';
import {provideRouter, RouterModule} from '@angular/router';

const meta: Meta<FooterComponent> = {
  title: 'Layout/Footer',
  component: FooterComponent,
  tags: ['autodocs'],
  decorators: [
    applicationConfig({
      providers: [provideRouter([])],
    }),
  ],
};

export default meta;
type Story = StoryObj<FooterComponent>;

export const Default: Story = {};
