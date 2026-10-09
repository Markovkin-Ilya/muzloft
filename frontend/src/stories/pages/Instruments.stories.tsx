import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Route, Routes } from "react-router-dom";
import { Instruments } from "@pages/instruments";
import { TInstrumentsMode } from "@pages/instruments/type";
import { storyBases } from "./data/bases";
import { storyUser } from "./data/user";
import { StoryPageSetup } from "./data/storyPageSetup";

const getStoryPath = (mode: TInstrumentsMode) => {
  if (mode === "room") {
    return "/rooms/yellow";
  }

  if (mode === "repetition") {
    return "/repetitions/repetition-1";
  }

  return "/instruments";
};

const getStoryRoute = (mode: TInstrumentsMode) => {
  if (mode === "room") {
    return "/rooms/:roomId";
  }

  if (mode === "repetition") {
    return "/repetitions/:repetitionId";
  }

  return "/instruments";
};

const meta = {
  title: "Pages/Instruments",
  component: Instruments,
  tags: ["autodocs"],
  decorators: [
    (Story, context) => (
      <StoryPageSetup
        path={getStoryPath(context.args.mode)}
        user={storyUser}
        base={storyBases[0]}
        orderDraft={
          context.args.mode === "booking"
            ? {
                roomid: "yellow",
                slot: {
                  date: "2026-10-15T17:00:00",
                  period: "3",
                },
                instrumentsId: [],
              }
            : undefined
        }
      >
        <Routes>
          <Route path={getStoryRoute(context.args.mode)} element={<Story />} />
          <Route path="*" element={null} />
        </Routes>
      </StoryPageSetup>
    ),
  ],
} satisfies Meta<typeof Instruments>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Room: Story = {
  args: { mode: "room" },
};

export const Base: Story = {
  args: { mode: "base" },
};

export const Repetition: Story = {
  args: { mode: "repetition" },
};

export const Booking: Story = {
  args: { mode: "booking" },
};
