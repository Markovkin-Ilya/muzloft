import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Profile } from "../components/profile/profile";
import guitaristAvatar from "./assets/profile/guitarist.jpg";

const meta = {
  title: "components/profile",
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
    password: "securepassword123",
  },
};

export const WithoutAvatar: Story = {
  args: {
    phone: "+7 (999) 987-65-43",
    email: "user456@example.com",
    login: "user456",
    password: "password456",
  },
};

export const Minimal: Story = {
  args: {
    login: "guest",
  },
};

export const WithErrors: Story = {
  args: {
    avatar: guitaristAvatar,
    phone: "+7 (999) 123-45-67",
    email: "user@example.com",
    login: "user123",
    password: "securepassword123",
    initiallyEditing: true,
    errors: {
      phone: "Неверный формат телефона наверное может быть",
      email: "Почта не зарегистрирована или некоректный формат почты",
      login: "Логин уже занят или он слишком эпичный для этого приложения",
      password: "Пароль должен содержать минимум 8 символов и много чего ещё",
    },
  },
};
