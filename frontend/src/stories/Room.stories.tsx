import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Room } from "../components/room";
import { TRoom } from "@utils/types";
import RoomYellow from "./assets/baseDetails/Комната Yellow.jpg";
import RoomGreen from "./assets/baseDetails/Комната Green.jpg";
import RoomBlue from "./assets/baseDetails/Комната Blue.jpg";

const room: TRoom = {
  id: "yellow",
  title: "Yellow",
  description:
    "Комната в отдельном здании от остальных. Хорошая звукоизоляция. Просторная. Подходит для любых музыкальных групп",
  image: [RoomYellow, RoomGreen, RoomBlue],
  slots: [
    {
      _id: "slot-1",
      date: new Date("2026-10-08T10:00:00"),
      period: "2",
      price: 800,
    },
    {
      _id: "slot-2",
      date: new Date("2026-10-08T12:00:00"),
      period: "2",
      price: 1200,
    },
  ],
  instruments: [],
};

const meta = {
  title: "components/room",
  component: Room,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Room>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    room,
    onBook: () => {},
    onShowInstruments: () => {},
  },
};
