import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { SearchUI } from "../components/search/ui/search";
import Icon from "@/assets/images/search/magnifier.svg";

const meta = {
  title: "components/search",
  component: SearchUI,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    onChange: () => {},
    onIconClick: () => {},
  },
} satisfies Meta<typeof SearchUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Поиск по названию базы...",
    value: ""
  },
};

export const Filled: Story = {
  args: {
    value: "Значение",
    placeholder: "Поиск по названию базы...",
  },
};

export const WithError: Story = {
  args: {
    placeholder: "Поиск по названию базы...",
    error: "Ошибка ввода",
  },
};

export const Disabled: Story = {
  args: {
    value: "Заблокировано",
    placeholder: "Поиск по названию базы...",
    disabled: true,
  },
};

export const WithIcon: Story = {
  args: {
    placeholder: "Поиск по названию базы...",

    icon: (
       <img src={Icon}/>
    ),

    error: ""
  },
};
