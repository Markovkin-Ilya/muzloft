import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Events } from "@pages/events";
import { storyEvents } from "./data/events";
import { StoryPageSetup } from "./data/storyPageSetup";

const meta = {
  title: "Pages/Events",
  component: Events,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <StoryPageSetup path="/events" events={storyEvents}>
        <Story />
      </StoryPageSetup>
    ),
  ],
} satisfies Meta<typeof Events>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
