import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { EventsPage } from "@pages/events";
import { storyEvents } from "../fixtures/events";
import { StoryPageSetup } from "../helpers/storyPageSetup";

const meta = {
  title: "Pages/Events",
  component: EventsPage,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <StoryPageSetup path="/events" events={storyEvents}>
        <Story />
      </StoryPageSetup>
    ),
  ],
} satisfies Meta<typeof EventsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
