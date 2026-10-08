import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { BaseDetails } from "@components/baseDetails";
import { storyBases } from "../pages/data/bases";
import { StoryPageSetup } from "../pages/data/storyPageSetup";

const meta = {
  title: "Components/BaseDetails",
  component: BaseDetails,
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
} satisfies Meta<typeof BaseDetails>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onBook: () => {},
    onRoomSelect: () => {},
    onRentInstruments: () => {},
    onShowReviews: () => {},
  },
};
