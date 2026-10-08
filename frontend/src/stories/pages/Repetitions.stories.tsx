import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Repetitions } from "@pages/repetitions/repetitions";
import { storyUser } from "./data/store";
import { StoryPageSetup } from "./data/storyPageSetup";

const meta = {
  title: "Pages/Repetitions",
  component: Repetitions,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <StoryPageSetup user={storyUser}>
        <Story />
      </StoryPageSetup>
    ),
  ],
} satisfies Meta<typeof Repetitions>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
