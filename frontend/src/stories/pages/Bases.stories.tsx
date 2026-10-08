import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Bases } from "@pages/bases";
import { StoryPageSetup } from "./data/storyPageSetup";

const meta = {
  title: "Pages/Bases",
  component: Bases,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <StoryPageSetup path="/bases">
        <Story />
      </StoryPageSetup>
    ),
  ],
} satisfies Meta<typeof Bases>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
