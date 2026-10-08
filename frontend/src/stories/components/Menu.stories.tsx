import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Menu } from "@components/menu";

const meta = {
  title: "Components/Menu",
  component: Menu,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { label: "Все", to: "/" },
      { label: "События", to: "/events" },
      { label: "Бронирование", to: "/booking" },
      { label: "Репетиции", to: "/rehearsals" },
      { label: "Избранное", to: "/favorites" },
      { label: "Профиль", to: "/profile" },
    ],
  },
};
