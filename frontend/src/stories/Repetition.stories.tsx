import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { RepetitionUI } from "../components/repetition/ui/repetition";

const meta = {
  title: "components/repetition",
  component: RepetitionUI,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof RepetitionUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    date: "15.09.2026",
    time: "17:00-20:00",
    base: "GrungeMoscow",
    address: "г.Москва, ул. Музыкальная, д.93",
    room: "Green",
    payment: "online",
    onInstruments: () => {},
    onMap: () => {},
  },
};

export const UnpaidCash: Story = {
  args: {
    date: "15.09.2026",
    time: "17:00-20:00",
    base: "GrungeMoscow",
    address: "г.Москва, ул. Музыкальная, д.93",
    room: "Green",
    payment: "cash",
    onInstruments: () => {},
    onMap: () => {},
  },
};

export const UnpaidCard: Story = {
  args: {
    date: "15.09.2026",
    time: "17:00-20:00",
    base: "GrungeMoscow",
    address: "г.Москва, ул. Музыкальная, д.93",
    room: "Green",
    payment: "card",
    onInstruments: () => {},
    onMap: () => {},
  },
};
