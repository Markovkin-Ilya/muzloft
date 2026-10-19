import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { BasesPage } from "@pages/bases";
import { storyBases } from "./data/bases";
import { StoryPageSetup } from "./data/storyPageSetup";

const meta = {
  title: "Pages/Bases",
  component: BasesPage,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <StoryPageSetup path="/bases" bases={storyBases}>
        <Story />
      </StoryPageSetup>
    ),
  ],
} satisfies Meta<typeof BasesPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
