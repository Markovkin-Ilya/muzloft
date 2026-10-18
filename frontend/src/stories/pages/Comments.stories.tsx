import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Comments } from "@pages/comments";
import { storyBases } from "./data/bases";
import { storyComments } from "./data/comments";
import { StoryPageSetup } from "./data/storyPageSetup";

const meta = {
  title: "Pages/Comments",
  component: Comments,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <StoryPageSetup base={{ ...storyBases[0], comments: storyComments }}>
        <Story />
      </StoryPageSetup>
    ),
  ],
} satisfies Meta<typeof Comments>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
