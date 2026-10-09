import { FC } from "react";
import { useParams } from "react-router-dom";
import { TInstrumentButtonState } from "@components/instrument";
import {
  selectBaseDetails,
  selectOrderDraft,
  toggleOrderInstrument,
} from "@services/bases/slice";
import { useDispatch, useSelector } from "@services/store";
import { selectRepetitions } from "@services/user/slice";
import { TInstrument } from "@utils/types";
import { InstrumentsUI } from "./ui";
import {
  TInstrumentCardProps,
  TInstrumentsCategory,
  TInstrumentsProps,
} from "./type";

const toDate = (value: Date | string) =>
  new Date(value instanceof Date ? value.getTime() : value);

const hasTimeConflict = (
  instrument: TInstrument,
  date: Date,
  duration: number,
) => {
  const requestedStart = date.getTime();
  const requestedEnd = requestedStart + duration * 60 * 60 * 1000;

  return instrument.slots?.some((slot) => {
    const bookedStart = Date.parse(String(slot.date));
    const bookedDuration = Number(slot.period);

    if (
      !Number.isFinite(bookedStart) ||
      !Number.isFinite(bookedDuration) ||
      bookedDuration <= 0
    ) {
      return false;
    }

    const bookedEnd = bookedStart + bookedDuration * 60 * 60 * 1000;
    return requestedStart < bookedEnd && bookedStart < requestedEnd;
  });
};

export const Instruments: FC<TInstrumentsProps> = ({ mode }) => {
  const { roomId, repetitionId } = useParams();
  const dispatch = useDispatch();
  const baseDetails = useSelector(selectBaseDetails);
  const orderDraft = useSelector(selectOrderDraft);
  const repetitions = useSelector(selectRepetitions);

  const repetition =
    mode === "repetition"
      ? repetitions.find((item) => item._id === repetitionId)
      : undefined;
  const room =
    mode === "room"
      ? baseDetails?.rooms.find((item) => item._id === roomId)
      : mode === "booking"
        ? baseDetails?.rooms.find((item) => item._id === orderDraft?.roomid)
        : undefined;
  const instruments =
    mode === "repetition"
      ? (repetition?.instruments ?? [])
      : mode === "room" || mode === "booking"
        ? (room?.instruments ?? [])
        : (baseDetails?.instruments ?? []);
  const repetitionDate =
    mode === "repetition" && repetition
      ? toDate(repetition.slot.date)
      : mode === "booking" && orderDraft
        ? toDate(orderDraft.slot.date)
        : undefined;
  const durationHours =
    mode === "repetition" && repetition
      ? Number(repetition.slot.period)
      : mode === "booking" && orderDraft
        ? Number(orderDraft.slot.period)
        : Number.NaN;
  const validRepetition =
    repetitionDate !== undefined &&
    Number.isFinite(repetitionDate.getTime()) &&
    Number.isFinite(durationHours) &&
    durationHours > 0;

  const handleInstrumentToggle = (instrumentId: string) => {
    if (mode === "booking" && validRepetition) {
      dispatch(toggleOrderInstrument(instrumentId));
    }
  };

  const getInstrumentCardProps = (
    instrument: TInstrument,
  ): TInstrumentCardProps => {
    if (mode === "room") {
      return { instrument, hideSlotPrice: true };
    }

    if (mode === "base") {
      return { instrument };
    }

    const isBusy =
      validRepetition &&
      repetitionDate !== undefined &&
      hasTimeConflict(instrument, repetitionDate, durationHours);
    const isSelected =
      orderDraft?.instrumentsId.includes(instrument._id) ?? false;
    const buttonState: TInstrumentButtonState = isBusy
      ? "busy"
      : isSelected
        ? "booked"
        : "available";

    return {
      instrument,
      repetitionDate,
      repetitionPrice:
        instrument.price !== undefined && validRepetition
          ? instrument.price * durationHours
          : undefined,
      buttonState,
      buttonDisabled: !validRepetition || isBusy,
      onBook: () => handleInstrumentToggle(instrument._id),
    };
  };

  const instrumentCards: TInstrumentCardProps[] =
    mode === "repetition"
      ? (repetition?.instruments.map((instrument) => ({
          instrument,
          repetitionPrice: instrument.slot.price,
          hideSlotPrice: true,
          buttonState: "booked",
          buttonDisabled: true,
        })) ?? [])
      : instruments.map(getInstrumentCardProps);
  const categoryMap = new Map<string, TInstrumentCardProps[]>();

  instrumentCards.forEach(({ instrument, ...cardProps }) => {
    const categoryInstruments = categoryMap.get(instrument.category) ?? [];
    categoryInstruments.push({ instrument, ...cardProps });
    categoryMap.set(instrument.category, categoryInstruments);
  });

  const categories: TInstrumentsCategory[] = Array.from(
    categoryMap,
    ([name, categoryInstruments]) => ({
      name,
      instruments: categoryInstruments,
    }),
  );

  return <InstrumentsUI categories={categories} />;
};
