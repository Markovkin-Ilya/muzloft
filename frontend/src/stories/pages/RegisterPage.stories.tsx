import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { expect, fireEvent, userEvent, within } from "storybook/test";
import { RegisterPage } from "@pages/register";
import { StoryPageSetup, TStoryAuthResponses } from "../helpers/storyPageSetup";

const meta = {
  title: "Pages/Auth/Register",
  component: RegisterPage,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story, context) => (
      <StoryPageSetup
        path="/register"
        user={null}
        isolatedAuth
        authResponses={
          context.parameters.authResponses as TStoryAuthResponses | undefined
        }
      >
        <Story />
      </StoryPageSetup>
    ),
  ],
} satisfies Meta<typeof RegisterPage>;

export default meta;
type Story = StoryObj<typeof meta>;

const enterRegistrationDetails = (canvasElement: HTMLElement) => {
  const canvas = within(canvasElement);
  fireEvent.change(canvas.getByRole("textbox", { name: "Имя" }), {
    target: { value: "Гость" },
  });
  fireEvent.change(canvas.getByRole("textbox", { name: "E-mail" }), {
    target: { value: "guest@example.com" },
  });
  fireEvent.change(canvas.getByLabelText("Пароль"), {
    target: { value: "password123" },
  });
};

export const Default: Story = {};

export const PasswordsDoNotMatch: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    enterRegistrationDetails(canvasElement);
    fireEvent.change(canvas.getByLabelText("Повторите пароль"), {
      target: { value: "different123" },
    });
    await userEvent.click(
      canvas.getByRole("button", { name: "Зарегистрироваться" }),
    );

    const error = await canvas.findByRole("alert");
    await expect(error).toHaveTextContent("Пароли не совпадают.");
  },
};

export const EmailAlreadyRegistered: Story = {
  parameters: {
    authResponses: {
      register: {
        status: 409,
        body: {
          success: false,
          code: "EMAIL_ALREADY_EXISTS",
          message: "Email is already in use.",
        },
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    enterRegistrationDetails(canvasElement);
    fireEvent.change(canvas.getByLabelText("Повторите пароль"), {
      target: { value: "password123" },
    });
    await userEvent.click(
      canvas.getByRole("button", { name: "Зарегистрироваться" }),
    );

    const error = await canvas.findByRole("alert");
    await expect(error).toHaveTextContent(
      "Этот адрес электронной почты уже зарегистрирован.",
    );
  },
};
