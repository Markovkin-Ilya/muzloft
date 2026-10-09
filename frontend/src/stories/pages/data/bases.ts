import { TBase } from "@utils/types";
import BaseImage from "../../assets/baseDetails/Гитары.png";
import BaseCardImage from "../../assets/baseCard/гитары.jpg";
import RoomYellow from "../../assets/baseDetails/Комната Yellow.jpg";
import RoomGreen from "../../assets/baseDetails/Комната Green.jpg";
import RoomBlue from "../../assets/baseDetails/Комната Blue.jpg";
import { storyInstruments } from "./instruments";

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
    rooms: [
      {
        _id: "yellow",
        title: "Yellow",
        description: "Светлая репетиционная комната.",
        image: [RoomYellow],
        slots: [],
        instruments: storyInstruments.slice(0, 4),
      },
      {
        _id: "green",
        title: "Green",
        description: "Комната с профессиональной аппаратурой.",
        image: [RoomGreen],
        slots: [],
        instruments: storyInstruments.slice(1, 5),
      },
      {
        _id: "blue",
        title: "Blue",
        description: "Уютная комната для репетиций.",
        image: [RoomBlue],
        slots: [],
        instruments: storyInstruments.slice(2, 6),
      },
    ],
    instruments: storyInstruments,
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
  },
  {
    _id: "kurt-club",
    title: "KurtClub",
    description:
      "Комфортные комнаты для репетиций с оборудованием для групп любого состава.",
    image: BaseCardImage,
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
    image: BaseCardImage,
    address: "г. Москва, ул. Живописная, д. 84",
    rating: 4.3,
    phone: "8(495) 555-55-57",
    ownerid: "owner-bluzoff",
    rooms: [],
    instruments: [],
    comments: [],
  },
];
