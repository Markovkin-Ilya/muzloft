import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { BookingFooter } from "@widgets/booking-flow";

const meta = {
  title: "Widgets/BookingFlow/BookingFooter",
  component: BookingFooter,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    onBack: () => {},
    onNext: () => {},
  },
  decorators: [
    (Story) => (
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          minHeight: "100vh",
          backgroundColor: "var(--background)",
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof BookingFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FirstStepWithoutSelection: Story = {
  args: {
    currentStep: 1,
    price: 0,
    isNextDisabled: true,
  },
};

export const FirstStepWithSelection: Story = {
  args: {
    currentStep: 1,
    price: 0,
  },
};

export const SlotSelected: Story = {
  args: {
    currentStep: 2,
    price: 4100,
  },
};

export const Confirmation: Story = {
  args: {
    currentStep: 5,
    price: 4100,
    nextText: "Подтвердить",
  },
};

export const BookingComplete: Story = {
  args: {
    currentStep: 6,
    price: 4100,
    backText: "К бронированию",
    nextText: "Готово",
  },
};
