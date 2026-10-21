import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { EventDetails } from "@widgets/event-details";
import { storyEvents } from "../../fixtures/events";
import { StoryPageSetup } from "../../helpers/storyPageSetup";

const meta = {
  title: "Widgets/EventDetails",
  component: EventDetails,
  tags: ["autodocs"],
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

export const LoadedEvent: Story = {};
