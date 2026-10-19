import { FC, memo } from "react";
import { InstrumentUI } from "./ui/instrument";
import { TInstrumentProps } from "./type";

export const Instrument: FC<TInstrumentProps> = memo(
  ({
    instrument,
    repetitionDate,
    repetitionPrice,
    hideSlotPrice = false,
    buttonState,
    buttonDisabled,
    onBook,
  }) => {
    const repetitionSlot = repetitionDate
      ? instrument.slots?.find(
          (slot) => Date.parse(String(slot.date)) === repetitionDate.getTime(),
        )
      : undefined;

    return (
      <InstrumentUI
        title={instrument.title}
        image={instrument.image}
        slotPrice={hideSlotPrice ? undefined : instrument.price}
        repetitionPrice={repetitionPrice ?? repetitionSlot?.price}
        buttonState={buttonState}
        buttonDisabled={buttonDisabled}
        onBook={onBook}
      />
    );
  },
);
