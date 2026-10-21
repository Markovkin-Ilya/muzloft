import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { expect, fireEvent, userEvent, within } from "storybook/test";
import { LoginPage } from "@pages/login";
import { StoryPageSetup, TStoryAuthResponses } from "../helpers/storyPageSetup";

const meta = {
  title: "Pages/Auth/Login",
  component: LoginPage,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story, context) => (
      <StoryPageSetup
        path="/login"
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
} satisfies Meta<typeof LoginPage>;

export default meta;
type Story = StoryObj<typeof meta>;

const enterLoginCredentials = (canvasElement: HTMLElement) => {
  const canvas = within(canvasElement);
  fireEvent.change(canvas.getByRole("textbox", { name: "E-mail" }), {
    target: { value: "guest@example.com" },
  });
  fireEvent.change(canvas.getByLabelText("Пароль"), {
    target: { value: "password123" },
  });
};

export const Default: Story = {};

export const InvalidCredentials: Story = {
  parameters: {
    authResponses: {
      login: {
        status: 401,
        body: {
          success: false,
          message: "The email address was not found.",
        },
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    enterLoginCredentials(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Войти" }));

    const error = await canvas.findByRole("alert");
    await expect(error).toHaveTextContent("Неверная почта или пароль.");
  },
};

export const Submitting: Story = {
  parameters: {
    authResponses: {
      login: {
        status: 401,
        delayMs: 900,
        body: { success: false, message: "Invalid credentials" },
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    enterLoginCredentials(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Войти" }));

    const submitButton = canvas.getByRole("button", {
      name: "Подождите...",
    });
    await expect(submitButton).toBeDisabled();
    await canvas.findByRole("alert");
  },
};

export const RememberMeEnabled: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const rememberMe = canvas.getByRole("checkbox", {
      name: "Запомнить меня",
    });

    await userEvent.click(rememberMe);
    await expect(rememberMe).toBeChecked();
  },
};
