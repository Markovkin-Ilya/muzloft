import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { ButtonUI } from "../components/button/ui/button";

const meta = {
  title: "components/button",
  component: ButtonUI,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ButtonUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: {
    size: "small",
    children: "Button",
  },
};

export const Large: Story = {
  args: {
    size: "large",
    children: "Button",
  },
};

export const Disabled: Story = {
  args: {
    size: "small",
    children: "Disabled",
    disabled: true,
  },
};

export const WithIcon: Story = {
  args: {
    size: "small",
    children: "With Icon",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 1.5a5.5 5.5 0 110 11 5.5 5.5 0 010-11zM7.25 4v4.25H6v1.5h2.5V4H7.25z" />
      </svg>
    ),
  },
};
