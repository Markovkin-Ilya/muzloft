import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Instrument } from "@components/instrument";
import { TInstrument } from "@utils/types";
import  cintezator  from "../assets/instrument/Cинтезатор ROLAND GAIA-2.jpg";
import acousticGuitar from "../assets/instrument/Акустическая гитара IBANEZ AAD170CE LGS.jpg";
import acousticDrums from "../assets/instrument/Акустическая ударная установка TAMA CL52KRS-TPB SUPERSTAR CLASSIC MAPLE.jpg";
import guitarAmplifier from "../assets/instrument/Комбоусилитель MARSHALL DSL40 COMBO.jpg";
import electricGuitar from "../assets/instrument/Электрогитара IBANEZ GRX70QA-TRB.jpg";

const repetitionDate = new Date("2026-10-15T17:00:00");

const cintezatorInstrument: TInstrument = {
  _id: "roland-gaia-2",
  title: "ROLAND GAIA-2",
  category: "Синтезатор",
  image: cintezator,
  slots: [
    {
      _id: "cintezator-slot",
      date: repetitionDate,
      period: "2",
      price: 600,
    },
  ],
};

const acousticGuitarInstrument: TInstrument = {
  _id: "ibanez-aad170ce-lgs",
  title: "IBANEZ AAD170CE LGS",
  category: "Акустическая гитара",
  image: acousticGuitar,
  slots: [
    {
      _id: "acoustic-guitar-slot",
      date: repetitionDate,
      period: "2",
      price: 400,
    },
  ],
};

const acousticDrumsInstrument: TInstrument = {
  _id: "tama-cl52krs-tpb",
  title: "TAMA CL52KRS-TPB SUPERSTAR CLASSIC MAPLE",
  category: "Акустическая ударная установка",
  image: acousticDrums,
  slots: [
    {
      _id: "acoustic-drums-slot",
      date: repetitionDate,
      period: "2",
      price: 600,
    },
  ],
};

const guitarAmplifierInstrument: TInstrument = {
  _id: "marshall-dsl40-combo",
  title: "MARSHALL DSL40 COMBO",
  category: "Комбоусилитель",
  image: guitarAmplifier,
};

const electricGuitarInstrument: TInstrument = {
  _id: "ibanez-grx70qa-trb",
  title: "IBANEZ GRX70QA-TRB",
  category: "Электрогитара",
  image: electricGuitar,
  price: 350,
};

const meta = {
  title: "Components/Instrument",
  component: Instrument,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Instrument>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BusyWithRepetitionPrice: Story = {
  args: {
    instrument: cintezatorInstrument,
    repetitionDate,
    buttonState: "busy",
  },
};

export const BookedActiveWithRepetitionPrice: Story = {
  args: {
    instrument: acousticDrumsInstrument,
    repetitionDate,
    buttonState: "booked",
  },
};

export const BookedInactiveWithRepetitionPrice: Story = {
  args: {
    instrument: acousticGuitarInstrument,
    repetitionDate,
    buttonState: "booked",
    buttonDisabled: true,
  },
};

export const WithoutButtonOrPrices: Story = {
  args: {
    instrument: guitarAmplifierInstrument,
  },
};

export const WithoutButtonWithSlotPrice: Story = {
  args: {
    instrument: electricGuitarInstrument,
  },
};
