import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { expect, fireEvent, userEvent, within } from "storybook/test";
import { NewPassword } from "@features/new-password";
import { StoryPageSetup, TStoryAuthResponses } from "../helpers/storyPageSetup";

const meta = {
  title: "Features/NewPassword",
  component: NewPassword,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story, context) => (
      <StoryPageSetup
        path="/newpassword"
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
} satisfies Meta<typeof NewPassword>;

export default meta;
type Story = StoryObj<typeof meta>;

const storyEmail = "guest@example.com";

const sendCodeResponse = { status: 200, body: { success: true } };

const verifyCodeResponse = {
  status: 200,
  body: { success: true, resetToken: "story-reset-token" },
};

const enterEmail = async (canvasElement: HTMLElement) => {
  const canvas = within(canvasElement);
  const emailInput = await canvas.findByRole("textbox", { name: "E-mail" });
  fireEvent.change(emailInput, { target: { value: storyEmail } });
  await userEvent.click(canvas.getByRole("button", { name: "Отправить код" }));
};

const enterCode = async (canvasElement: HTMLElement) => {
  const canvas = within(canvasElement);
  await canvas.findByRole("heading", { name: "Введите код" });
  fireEvent.change(canvas.getByLabelText("Код из письма"), {
    target: { value: "123456" },
  });
  await userEvent.click(canvas.getByRole("button", { name: "Подтвердить" }));
};

export const EmailStep: Story = {};

export const CodeStep: Story = {
  parameters: {
    authResponses: { forgotPassword: sendCodeResponse },
  },
  play: async ({ canvasElement }) => {
    await enterEmail(canvasElement);
    const canvas = within(canvasElement);
    await canvas.findByRole("heading", { name: "Введите код" });
    await expect(
      canvas.getByText(`Мы отправили код на ${storyEmail}`),
    ).toBeInTheDocument();
  },
};

export const SendCodeError: Story = {
  parameters: {
    authResponses: {
      forgotPassword: {
        status: 500,
        body: { success: false, message: "Internal error" },
      },
    },
  },
  play: async ({ canvasElement }) => {
    await enterEmail(canvasElement);
    const error = await within(canvasElement).findByRole("alert");
    await expect(error).toHaveTextContent(
      "Не удалось отправить код. Попробуйте ещё раз.",
    );
  },
};

export const InvalidCode: Story = {
  parameters: {
    authResponses: {
      forgotPassword: sendCodeResponse,
      verifyResetCode: {
        status: 400,
        body: { success: false, message: "Invalid code" },
      },
    },
  },
  play: async ({ canvasElement }) => {
    await enterEmail(canvasElement);
    await enterCode(canvasElement);
    const error = await within(canvasElement).findByRole("alert");
    await expect(error).toHaveTextContent("Неверный или просроченный код.");
  },
};

export const PasswordStep: Story = {
  parameters: {
    authResponses: {
      forgotPassword: sendCodeResponse,
      verifyResetCode: verifyCodeResponse,
    },
  },
  play: async ({ canvasElement }) => {
    await enterEmail(canvasElement);
    await enterCode(canvasElement);
    await within(canvasElement).findByRole("heading", { name: "Новый пароль" });
  },
};
