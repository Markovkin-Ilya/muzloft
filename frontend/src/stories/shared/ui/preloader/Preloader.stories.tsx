import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Preloader } from "@shared/ui/preloader";

const meta = {
  title: "Shared/Preloader",
  component: Preloader,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div
        style={{
          display: "grid",
          minHeight: "100vh",
          placeItems: "center",
          backgroundColor: "var(--background)",
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Preloader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Loading: Story = {};
