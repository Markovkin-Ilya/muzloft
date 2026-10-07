import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { BaseDetails } from "../components/baseDetails";
import { TBase } from "@utils/types";
import Base from "./assets/baseDetails/Гитары.png";
import RoomYellow from "./assets/baseDetails/Комната Yellow.jpg";
import RoomGreen from "./assets/baseDetails/Комната Green.jpg";
import RoomBlue from "./assets/baseDetails/Комната Blue.jpg";

const base: TBase = {
  _id: "grunge-moscow",
  title: "GrungeMoscow",
  description:
    "Наша репбаза ждет заядлых рокеров и панков, которые разбираются в музыке. Свежие и отстроенные инструменты, приветливый персонал, рядом с метро Щифeрная",
  image: Base,
  address: "г. Москва, ул. Музыкальная, д. 93",
  phone: "8(495) 555-55-55",
  ownerid: "owner-1",
  rooms: [
    {
      id: "yellow",
      title: "Yellow",
      description: "Светлая репетиционная комната.",
      image: [RoomYellow],
      slots: [],
      instruments: [],
    },
    {
      id: "green",
      title: "Green",
      description: "Комната с профессиональной аппаратурой.",
      image: [RoomGreen],
      slots: [],
      instruments: [],
    },
    {
      id: "blue",
      title: "Blue",
      description: "Уютная комната для репетиций.",
      image: [RoomBlue],
      slots: [],
      instruments: [],
    },
  ],
  instruments: [],
  comments: [
    {
      _id: "review-1",
      artistid: "artist-1",
      room: "Green",
      scores: 5,
      date: "2026-09-15",
      comment: "Отличная база и удобные комнаты.",
    },
    {
      _id: "review-2",
      artistid: "artist-2",
      room: "Yellow",
      scores: 4.5,
      date: "2026-09-10",
      comment: "Хорошие инструменты и приятный персонал.",
    },
    {
      _id: "review-3",
      artistid: "artist-3",
      room: "Blue",
      scores: 5,
      date: "2026-09-02",
      comment: "Вернемся еще.",
    },
  ],
};

const meta = {
  title: "components/baseDetails",
  component: BaseDetails,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof BaseDetails>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    base,
    onBook: () => {},
    onRoomSelect: () => {},
    onRentInstruments: () => {},
    onShowReviews: () => {},
  },
};
