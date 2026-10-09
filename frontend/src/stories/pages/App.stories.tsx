import type { Meta, StoryObj } from "@storybook/react-webpack5";
import App from "@pages/app/app";
import { storyBases } from "./data/bases";
import { storyEvents } from "./data/events";
import { storyInstruments } from "./data/instruments";
import { storyUser } from "./data/user";
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
      <StoryPageSetup
        path="/events"
        user={storyUser}
        bases={storyBases}
        events={storyEvents}
        base={{
          ...storyBases[0],
          instruments: storyInstruments,
        }}
      >
        <Story />
      </StoryPageSetup>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof App>;

export const HomePage: Story = {};
