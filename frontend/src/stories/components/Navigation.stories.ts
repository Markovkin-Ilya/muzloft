import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { AppNavigationUI as NavigationUI } from "@widgets/app-navigation";

const meta = {
  title: "Components/Navigation",
  component: NavigationUI,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof NavigationUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Log: Story = {
  args: {},
};
