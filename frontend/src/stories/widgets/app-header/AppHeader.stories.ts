import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { AppHeaderUI as HeaderUI } from "@widgets/app-header";

const meta = {
  title: "Widgets/AppHeader",
  component: HeaderUI,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof HeaderUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Log: Story = {
  args: {},
};
