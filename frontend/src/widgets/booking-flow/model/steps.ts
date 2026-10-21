export type TBookingStep =
  "room" | "slot" | "instruments" | "payment" | "confirmation" | "success";

export const getBookingSteps = ({
  hasRoomStep,
  hasInstrumentsStep,
}: {
  hasRoomStep: boolean;
  hasInstrumentsStep: boolean;
}): TBookingStep[] => {
  const steps: TBookingStep[] = [];
  if (hasRoomStep) {
    steps.push("room");
  }
  steps.push("slot");
  if (hasInstrumentsStep) {
    steps.push("instruments");
  }
  steps.push("payment", "confirmation", "success");
  return steps;
};

export const PAYMENT_OPTIONS = [
  { id: "online", label: "Онлайн" },
  { id: "cash", label: "Наличными на базе" },
  { id: "card", label: "Картой на базе" },
] as const;
