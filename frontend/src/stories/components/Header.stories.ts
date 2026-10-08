import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { HeaderUI } from "@components/header/ui/header";

const meta = {
  title: "Components/Header",
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
