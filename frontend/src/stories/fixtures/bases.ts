import { TBase, TSlot } from "@utils/types";
import BaseImage from "../assets/baseDetails/Гитары.png";
import BaseCardNarvana from "../assets/baseCard/Nirvana.jpg";
import BaseCardBluze from "../assets/baseCard/bluze.jpg";
import RoomYellow from "../assets/baseDetails/Комната Yellow.jpg";
import RoomGreen from "../assets/baseDetails/Комната Green.jpg";
import RoomBlue from "../assets/baseDetails/Комната Blue.jpg";
import { storyInstruments } from "./instruments";
import { storyComments } from "./comments";

const tomorrowBusyStart = new Date();
tomorrowBusyStart.setDate(tomorrowBusyStart.getDate() + 1);
tomorrowBusyStart.setHours(12, 0, 0, 0);

const tomorrowBusySlot: TSlot = {
  _id: "busy-tomorrow",
  date: tomorrowBusyStart,
  period: "3",
  price: 2200,
};

export const storyBases: TBase[] = [
  {
    _id: "grunge-moscow",
    title: "GrungeMoscow",
    description:
      "Наша репбаза ждет заядлых рокеров и панков, которые разбираются в музыке. Свежие и отстроенные инструменты, приветливый персонал, рядом с метро Щукинская.",
    image: BaseImage,
    address: "г. Москва, ул. Музыкальная, д. 93",
    rating: 4.8,
    phone: "8(495) 555-55-55",
    ownerid: "owner-grunge",
    workingHours: { from: 10, to: 22 },
    rooms: [
      {
        _id: "yellow",
        title: "Yellow",
        description: "Светлая репетиционная комната.",
        image: [RoomYellow],
        slots: [tomorrowBusySlot],
        basePrice: 1100,
        tariffs: [
          { price: 1500, fromHour: 15, toHour: 19 },
          { price: 2000, weekdays: [0, 6], fromHour: 12 },
        ],
        instruments: storyInstruments.slice(0, 4),
      },
      {
        _id: "green",
        title: "Green",
        description: "Комната с профессиональной аппаратурой.",
        image: [RoomGreen],
        slots: [],
        basePrice: 1400,
        instruments: storyInstruments.slice(1, 5),
      },
      {
        _id: "blue",
        title: "Blue",
        description: "Уютная комната для репетиций.",
        image: [RoomBlue],
        slots: [],
        basePrice: 900,
        instruments: storyInstruments.slice(2, 6),
      },
    ],
    instruments: storyInstruments,
    comments: storyComments,
  },
  {
    _id: "kurt-club",
    title: "KurtClub",
    description:
      "Комфортные комнаты для репетиций с оборудованием для групп любого состава.",
    image: BaseCardNarvana,
    address: "г. Москва, ул. Садовая, д. 61",
    rating: 4.6,
    phone: "8(495) 555-55-56",
    ownerid: "owner-kurt",
    rooms: [],
    instruments: [],
    comments: [],
  },
  {
    _id: "bluzoff",
    title: "Bluzoff",
    description:
      "Уютные репетиционные комнаты и необходимое оборудование для музыкантов.",
    image: BaseCardBluze,
    address: "г. Москва, ул. Живописная, д. 84",
    rating: 4.3,
    phone: "8(495) 555-55-57",
    ownerid: "owner-bluzoff",
    rooms: [],
    instruments: [],
    comments: [],
  },
];
