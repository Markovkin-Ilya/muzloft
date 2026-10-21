import { ReactNode, useEffect, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Route, Routes } from "react-router-dom";
import { BookingFlow } from "@widgets/booking-flow";
import { storyBases } from "../../fixtures/bases";
import { storyUser } from "../../fixtures/user";
import { StoryPageSetup } from "../../helpers/storyPageSetup";

const [grungeMoscow] = storyBases;

const StoryStage = ({ children }: { children: ReactNode }) => {
  const [isReady, setIsReady] = useState(false);

  // Modal ищет #app-page при рендере, поэтому монтируем его после страницы
  useEffect(() => setIsReady(true), []);

  return (
    <>
      <div
        id="app-page"
        style={{ height: "70vh", backgroundColor: "var(--background)" }}
      />
      {isReady && children}
    </>
  );
};

const meta = {
  title: "Widgets/BookingFlow",
  component: BookingFlow,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: { base: grungeMoscow, onClose: () => {} },
  decorators: [
    (Story) => (
      <StoryPageSetup user={storyUser} base={grungeMoscow} path="/">
        <StoryStage>
          <Routes>
            <Route path="*" element={<Story />} />
          </Routes>
        </StoryStage>
      </StoryPageSetup>
    ),
  ],
} satisfies Meta<typeof BookingFlow>;

export default meta;
type Story = StoryObj<typeof meta>;

// Начало с выбора комнаты
export const FromBase: Story = {};

// Комната уже известна: шаг выбора комнаты пропускается
export const FromRoom: Story = {
  args: { initialRoomId: "yellow" },
};

export const RoundTheClockBase: Story = {
  args: {
    initialRoomId: "yellow",
    base: { ...grungeMoscow, workingHours: "24h" },
  },
};

// В базе нет инструментов: шаг инструментов пропускается
export const WithoutInstruments: Story = {
  args: {
    initialRoomId: "yellow",
    base: { ...grungeMoscow, instruments: [] },
  },
};
