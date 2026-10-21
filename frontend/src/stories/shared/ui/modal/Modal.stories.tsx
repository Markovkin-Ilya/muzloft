import { useEffect, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Modal } from "@shared/ui/modal";

const ModalDemo = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--dark-background)" }}>
      <div
        id="app-page"
        style={{
          height: "70vh",
          padding: 24,
          color: "var(--text-primary-color)",
          backgroundColor: "var(--background)",
        }}
      >
        Основное содержимое страницы
      </div>
      {isOpen ? (
        <Modal
          onClose={() => setIsOpen(false)}
          dop={
            <div style={{ padding: 16, color: "var(--text-primary-color)" }}>
              Дополнительная область модального окна
            </div>
          }
        >
          <div
            style={{
              display: "grid",
              minHeight: 240,
              placeItems: "center",
              color: "var(--text-primary-color)",
              backgroundColor: "var(--dark-background)",
              borderRadius: 20,
            }}
          >
            Содержимое модального окна
          </div>
        </Modal>
      ) : (
        <button type="button" onClick={() => setIsOpen(true)}>
          Открыть модальное окно
        </button>
      )}
    </div>
  );
};

const meta = {
  title: "Shared/Modal",
  component: ModalDemo,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof ModalDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithAdditionalArea: Story = {};
