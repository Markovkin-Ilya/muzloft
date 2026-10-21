import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { BaseDetails } from "@widgets/base-details";
import { storyBases } from "../../fixtures/bases";
import { StoryPageSetup } from "../../helpers/storyPageSetup";

const meta = {
  title: "Widgets/BaseDetails",
  component: BaseDetails,
  tags: ["autodocs"],
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

export const LoadedBase: Story = {};
