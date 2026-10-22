import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { ProfilePage } from "@pages/profile";
import { StoryPageSetup } from "../helpers/storyPageSetup";
import guitaristAvatar from "../assets/profile/guitarist.jpg";

const meta = {
  title: "Pages/Profile",
  component: ProfilePage,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <StoryPageSetup user={null}>
        <Story />
      </StoryPageSetup>
    ),
  ],
} satisfies Meta<typeof ProfilePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    avatar: guitaristAvatar,
    phone: "+7 (999) 123-45-67",
    email: "user@example.com",
    name: "user123",
  },
};

export const WithoutAvatar: Story = {
  args: {
    phone: "+7 (999) 987-65-43",
    email: "user456@example.com",
    name: "user456",
  },
};

export const Minimal: Story = {
  args: {
    name: "guest",
  },
};

export const InEditingMode: Story = {
  args: {
    avatar: guitaristAvatar,
    phone: "+7 (999) 123-45-67",
    email: "user@example.com",
    name: "user123",
    initiallyEditing: true,
  },
};

export const AllErrors: Story = {
  args: {
    avatar: guitaristAvatar,
    phone: "+7 (999) 000-00-00",
    email: "invalid-email",
    name: "ab",
    initiallyEditing: true,
    errors: {
      phone: "Введите корректный номер телефона",
      email: "Введите корректный email",
      name: "Логин должен содержать минимум 3 символа",
      password: "Пароль должен содержать минимум 8 символов",
    },
  },
};
