import { FC } from "react";
import { InstrumentSelection } from "@features/instrument-selection";
import type { TRepetition } from "@utils/types";

type TInstrumentStepProps = {
  mode?: "booking" | "repetition";
  repetition?: TRepetition;
};

export const InstrumentStep: FC<TInstrumentStepProps> = ({
  mode = "booking",
  repetition,
}) => <InstrumentSelection mode={mode} repetition={repetition} />;
