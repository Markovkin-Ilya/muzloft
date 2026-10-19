import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { BaseDetailsUI } from "@entities/base";
import { storyBases } from "../pages/data/bases";
import { StoryPageSetup } from "../pages/data/storyPageSetup";

const meta = {
  title: "Entities/BaseDetails",
  component: BaseDetailsUI,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <StoryPageSetup base={storyBases[0]} bases={storyBases}>
        <Story />
      </StoryPageSetup>
    ),
  ],
} satisfies Meta<typeof BaseDetailsUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    base: storyBases[0],
    onBook: () => {},
    onRoomSelect: () => {},
    onRentInstruments: () => {},
    onShowReviews: () => {},
  },
};
