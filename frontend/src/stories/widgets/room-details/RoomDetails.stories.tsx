import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Route, Routes } from "react-router-dom";
import { RoomDetailsWidget } from "@widgets/room-details";
import { storyBases } from "../../fixtures/bases";
import { StoryPageSetup } from "../../helpers/storyPageSetup";

const meta = {
  title: "Widgets/RoomDetails",
  component: RoomDetailsWidget,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <StoryPageSetup base={storyBases[0]} path="/bases/grunge-moscow/yellow">
        <Routes>
          <Route path="/bases/:baseId/:roomId" element={<Story />} />
          <Route path="*" element={null} />
        </Routes>
      </StoryPageSetup>
    ),
  ],
} satisfies Meta<typeof RoomDetailsWidget>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoadedRoom: Story = {};
