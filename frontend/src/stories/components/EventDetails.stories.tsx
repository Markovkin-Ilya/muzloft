import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { EventDetails } from "@components/eventDetails";
import { storyEvents } from "../pages/data/events";
import { StoryPageSetup } from "../pages/data/storyPageSetup";

const meta = {
  title: "Components/EventDetails",
  component: EventDetails,
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
} satisfies Meta<typeof EventDetails>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
