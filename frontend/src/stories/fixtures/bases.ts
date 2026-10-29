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
        description:
          "Светлая просторная репетиционная комната с большими окнами и хорошей звукоизоляцией. Здесь удобно репетировать как небольшим группам, так и полноценным составам с барабанами и усилителями. В комнате есть зона для вокала, расставлены мягкие стулья и столы для нот и напитков. Перед входом можно оставить вещи в общей гардеробной, а после репетиции воспользоваться душевой на первом этаже.",
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
        description:
          "Комната с профессиональной аппаратурой для записи и репетиций. Усилители гитары и баса, барабанная установка с двойной педалью и мониторы для каждого участника подобраны так, чтобы звук оставался чистым даже на большой громкости. Комната оборудована кондиционером и отдельной точкой питания для гитарных эффектов. По запросу можно заранее настроить инструменты под конкретный стиль музыки группы.",
        image: [RoomGreen],
        slots: [],
        basePrice: 1400,
        instruments: storyInstruments.slice(1, 5),
      },
      {
        _id: "blue",
        title: "Blue",
        description:
          "Уютная небольшая комната для репетиций и сольной работы. Внутри тёплый свет, мягкий ковёр и хорошая акустика без лишнего эха, поэтому здесь комфортно разучивать партии и записывать демо. Комната подходит для трио и дуэтов, а также для занятий с преподавателем. Рядом есть кухня с чайником и кофемашиной, которыми можно пользоваться во время перерыва.",
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
