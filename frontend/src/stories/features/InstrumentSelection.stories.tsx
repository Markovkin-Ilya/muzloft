import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Route, Routes } from "react-router-dom";
import { InstrumentSelection } from "@features/instrument-selection";
import type { TInstrumentSelectionMode } from "@features/instrument-selection";
import { storyBases } from "../pages/data/bases";
import { storyUser } from "../pages/data/user";
import { StoryPageSetup } from "../pages/data/storyPageSetup";

const getStoryPath = (mode: TInstrumentSelectionMode) => {
  if (mode === "room") {
    return "/rooms/yellow";
  }

  if (mode === "repetition") {
    return "/repetitions/repetition-1";
  }

  return "/instruments";
};

const getStoryRoute = (mode: TInstrumentSelectionMode) => {
  if (mode === "room") {
    return "/rooms/:roomId";
  }

  if (mode === "repetition") {
    return "/repetitions/:repetitionId";
  }

  return "/instruments";
};

const meta = {
  title: "Features/InstrumentSelection",
  component: InstrumentSelection,
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
} satisfies Meta<typeof InstrumentSelection>;

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
