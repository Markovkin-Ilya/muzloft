import { FC, PropsWithChildren } from "react";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { App } from "@app";
import { storyBases } from "../fixtures/bases";
import { storyComments } from "../fixtures/comments";
import { storyEvents } from "../fixtures/events";
import { storyInstruments } from "../fixtures/instruments";
import { storyUser } from "../fixtures/user";
import { StoryPageSetup } from "../helpers/storyPageSetup";

type TAppStorySetupProps = PropsWithChildren<{
  path: string;
  user: typeof storyUser | null;
  locationState?: unknown;
}>;

const AppStorySetup: FC<TAppStorySetupProps> = ({
  children,
  path,
  user,
  locationState,
}) => (
  <StoryPageSetup
    path={path}
    locationState={locationState}
    user={user}
    bases={storyBases}
    events={storyEvents}
    base={{
      ...storyBases[0],
      instruments: storyInstruments,
      comments: storyComments,
    }}
    isolatedAuth
  >
    {children}
  </StoryPageSetup>
);

const meta = {
  title: "App/App",
  component: App,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof App>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AppUnlog: Story = {
  decorators: [
    (Story) => (
      <AppStorySetup path="/events" user={null}>
        <Story />
      </AppStorySetup>
    ),
  ],
};

export const AppLog: Story = {
  decorators: [
    (Story) => (
      <AppStorySetup path="/events" user={storyUser}>
        <Story />
      </AppStorySetup>
    ),
  ],
};
