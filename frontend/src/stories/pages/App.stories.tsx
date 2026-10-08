import type { Meta, StoryObj } from "@storybook/react-webpack5";
import App from "@pages/app/app";
import { storyUser } from "./data/store";
import { StoryPageSetup } from "./data/storyPageSetup";

const meta: Meta<typeof App> = {
  title: "Pages/App",
  component: App,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <StoryPageSetup path="/profile" user={storyUser}>
        <Story />
      </StoryPageSetup>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof App>;

export const HomePage: Story = {};
