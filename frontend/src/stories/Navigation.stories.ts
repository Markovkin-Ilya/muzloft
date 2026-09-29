import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { NavigationUI } from '../components/navigation/ui/navigation';

const meta = {
  title: 'components/navigation',
  component: NavigationUI,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  }
} satisfies Meta<typeof NavigationUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Log: Story = {
  args: {
  }
};