import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { SearchUI } from "@components/search/ui/search";
import Icon from "@/assets/images/icons/magnifier.svg";

const meta = {
  title: "Components/Search",
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
    value: "",
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

    icon: <img src={Icon} />,

    error: "",
  },
};

export const Small: Story = {
  args: {
    placeholder: "Поиск по названию базы...",
    value: "",
    size: "small",
  },
};

export const SmallFilled: Story = {
  args: {
    value: "Значение",
    placeholder: "Поиск по названию базы...",
    size: "small",
  },
};

export const SmallWithError: Story = {
  args: {
    placeholder: "Поиск по названию базы...",
    size: "small",
    error: "Ошибка ввода",
  },
};

export const SmallDisabled: Story = {
  args: {
    value: "Заблокировано",
    placeholder: "Поиск по названию базы...",
    size: "small",
    disabled: true,
  },
};

export const SmallWithIcon: Story = {
  args: {
    placeholder: "Поиск по названию базы...",
    size: "small",
    icon: <img src={Icon} />,
  },
};
