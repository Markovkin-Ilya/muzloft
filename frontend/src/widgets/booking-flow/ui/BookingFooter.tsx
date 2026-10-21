import { FC } from "react";
import { BackNext } from "@features/booking";
import { Button } from "@shared/ui/button";
import styles from "./BookingFooter.module.css";

export type TBookingFooterProps = {
  currentStep: number;
  price: number;
  onBack: () => void;
  onNext: () => void;
  isNextDisabled?: boolean;
  backText?: string;
  nextText?: string;
  // Последний шаг: вместо навигации одна кнопка
  finalAction?: { text: string; onClick: () => void };
};

export const BookingFooter: FC<TBookingFooterProps> = ({
  currentStep,
  price,
  onBack,
  onNext,
  isNextDisabled = false,
  backText = "Назад",
  nextText = "Далее",
  finalAction,
}) => (
  <footer className={styles.footer}>
    {finalAction ? (
      <Button className={styles.finalActionButton} size="large" onClick={finalAction.onClick}>
        {finalAction.text}
      </Button>
    ) : (
      <BackNext
        price={price}
        backText={backText}
        nextText={nextText}
        onBack={onBack}
        onNext={onNext}
        backDisabled={currentStep <= 1}
        nextDisabled={isNextDisabled}
      />
    )}
  </footer>
);
