import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { EventDetailsUI } from "@entities/event";
import { storyEvents } from "../pages/data/events";
import { StoryPageSetup } from "../pages/data/storyPageSetup";

const meta = {
  title: "Components/EventDetails",
  component: EventDetailsUI,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <StoryPageSetup event={storyEvents[0]}>
        <Story />
      </StoryPageSetup>
    ),
  ],
} satisfies Meta<typeof EventDetailsUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    event: storyEvents[0],
  },
};
