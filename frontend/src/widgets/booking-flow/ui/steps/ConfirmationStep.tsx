import { FC } from "react";
import { Repetition } from "@entities/repetition";
import { buildRepetition, getDraftSummary } from "../../model";
import type { TBookingStepProps } from "./types";

type TConfirmationStepProps = TBookingStepProps & {
  onShowInstruments: () => void;
};

export const ConfirmationStep: FC<TConfirmationStepProps> = ({
  base,
  draft,
  onShowInstruments,
}) => {
  const summary = getDraftSummary(base, draft);

  if (!summary) {
    return null;
  }

  return (
    <Repetition
      repetition={buildRepetition(base, draft, summary)}
      onInstruments={onShowInstruments}
      instrumentsLabel="Доп. инструменты"
      showMap={false}
    />
  );
};
