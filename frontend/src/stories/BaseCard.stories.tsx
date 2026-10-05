import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { BaseCardUI } from "../components/baseCard/ui/baseCard";
import Ava from "./assets/baseCard/гитары.jpg";

const meta = {
  title: "components/baseCard",
  component: BaseCardUI,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof BaseCardUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "GrungeMoscow",
    image: Ava,
    address: "г. Москва, ул. Музыкальная, д. 93",
    rating: 4.8,
    onClick: () => {},
    onMap: () => {},
  },
};

export const MediumRating: Story = {
  args: {
    name: "RockHall",
    image: Ava,
    address: "г. Москва, ул. Центральная, д. 15",
    rating: 4.5,
    onClick: () => {},
    onMap: () => {},
  },
};

export const LowRating: Story = {
  args: {
    name: "JazzClub",
    image: Ava,
    address: "г. Санкт-Петербург, ул. Музыкальная, д. 7",
    rating: 3.9,
    onClick: () => {},
    onMap: () => {},
  },
};
