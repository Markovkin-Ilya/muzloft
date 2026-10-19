import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { RoomDetailsUI } from "@entities/room";
import { TRoom } from "@utils/types";
import RoomYellow from "../assets/baseDetails/Комната Yellow.jpg";
import RoomGreen from "../assets/baseDetails/Комната Green.jpg";
import RoomBlue from "../assets/baseDetails/Комната Blue.jpg";

const room: TRoom = {
  _id: "yellow",
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
  title: "Entities/RoomDetails",
  component: RoomDetailsUI,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof RoomDetailsUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    room,
    priceRange: { min: 800, max: 1200 },
    onBook: () => {},
    onShowInstruments: () => {},
  },
};
