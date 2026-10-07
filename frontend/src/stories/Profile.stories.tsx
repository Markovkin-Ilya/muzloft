import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Profile } from "../pages/profile/profile";
import guitaristAvatar from "./assets/profile/guitarist.jpg";

const meta = {
  title: "pages/profile",
  component: Profile,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Profile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    avatar: guitaristAvatar,
    phone: "+7 (999) 123-45-67",
    email: "user@example.com",
    login: "user123",
  },
};

export const WithoutAvatar: Story = {
  args: {
    phone: "+7 (999) 987-65-43",
    email: "user456@example.com",
    login: "user456",
  },
};

export const Minimal: Story = {
  args: {
    login: "guest",
  },
};

export const InEditingMode: Story = {
  args: {
    avatar: guitaristAvatar,
    phone: "+7 (999) 123-45-67",
    email: "user@example.com",
    login: "user123",
    initiallyEditing: true,
  },
};

export const AllErrors: Story = {
  args: {
    avatar: guitaristAvatar,
    phone: "+7 (999) 000-00-00",
    email: "invalid-email",
    login: "ab",
    initiallyEditing: true,
    errors: {
      phone: "Введите корректный номер телефона",
      email: "Введите корректный email",
      login: "Логин должен содержать минимум 3 символа",
      password: "Пароль должен содержать минимум 8 символов",
    },
  },
};
