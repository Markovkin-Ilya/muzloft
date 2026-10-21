import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { RepetitionsPage } from "@pages/repetitions";
import { storyUser } from "../fixtures/user";
import { StoryPageSetup } from "../helpers/storyPageSetup";

const meta = {
  title: "Pages/Repetitions",
  component: RepetitionsPage,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <StoryPageSetup user={storyUser}>
        <Story />
      </StoryPageSetup>
    ),
  ],
} satisfies Meta<typeof RepetitionsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
