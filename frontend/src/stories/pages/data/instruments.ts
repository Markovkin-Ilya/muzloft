import { TBookedInstrument, TInstrument, TSlot } from "@utils/types";
import AcousticDrumImage from "../../assets/instrument/Акустическая ударная установка TAMA CL52KRS-TPB SUPERSTAR CLASSIC MAPLE.jpg";
import AcousticGuitarImage from "../../assets/instrument/Акустическая гитара IBANEZ AAD170CE LGS.jpg";
import BassImage from "../../assets/instrument/Бас-гитара IBANEZ GSR205B-WNF.jpg";
import GuitarAmpImage from "../../assets/instrument/Гитарный усилитель Boss DUAL CUBE LX.jpg";
import ElectricGuitarImage from "../../assets/instrument/Электрогитара YAMAHA PACIFICA 012 BL.jpeg";
import KeyboardImage from "../../assets/instrument/Синтезатор KORG NAUTILUS-88.jpg";

const bookedSlot: TSlot = {
  _id: "instrument-slot-1",
  date: new Date("2026-10-15T17:00:00"),
  period: "3",
  price: 900,
};

export const storyInstruments: TInstrument[] = [
  {
    _id: "instrument-electric-guitar",
    title: "Yamaha Pacifica 012",
    category: "Электрогитары",
    image: ElectricGuitarImage,
    price: 300,
    slots: [
      {
        _id: "instrument-busy-slot",
        date: new Date("2026-10-15T18:00:00"),
        period: "2",
        price: 600,
      },
    ],
  },
  {
    _id: "instrument-acoustic-guitar",
    title: "Ibanez AAD170CE",
    category: "Акустические гитары",
    image: AcousticGuitarImage,
    price: 250,
    slots: [],
  },
  {
    _id: "instrument-bass",
    title: "Ibanez GSR205B",
    category: "Бас-гитары",
    image: BassImage,
    price: 350,
    slots: [],
  },
  {
    _id: "instrument-drums",
    title: "Tama Superstar Classic",
    category: "Ударные установки",
    image: AcousticDrumImage,
    price: 500,
    slots: [],
  },
  {
    _id: "instrument-keyboard",
    title: "Korg Nautilus-88",
    category: "Клавишные",
    image: KeyboardImage,
    price: 450,
    slots: [],
  },
  {
    _id: "instrument-amplifier",
    title: "Boss Dual Cube LX",
    category: "Усилители",
    image: GuitarAmpImage,
    price: 150,
    slots: [],
  },
];

export const storyBookedInstruments: TBookedInstrument[] = storyInstruments
  .slice(0, 4)
  .map((instrument) => ({
    ...instrument,
    slot: { ...bookedSlot, price: instrument.price ?? bookedSlot.price },
  }));
