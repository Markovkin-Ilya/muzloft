import { FC } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { TInstrumentButtonState } from "@entities/instrument";
import {
  selectBaseDetails,
  selectOrderDraft,
  toggleOrderInstrument,
} from "@services/bases/slice";
import { useDispatch, useSelector } from "@services/store";
import { selectRepetitions } from "@services/user/slice";
import { TInstrument } from "@utils/types";
import { InstrumentSelectionView } from "./ui";
import {
  TInstrumentCardProps,
  TInstrumentSelectionCategory,
  TInstrumentSelectionProps,
} from "./types";

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

export const InstrumentSelection: FC<TInstrumentSelectionProps> = ({
  mode,
  repetition: repetitionProp,
}) => {
  const { roomId, repetitionId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const baseDetails = useSelector(selectBaseDetails);
  const orderDraft = useSelector(selectOrderDraft);
  const repetitions = useSelector(selectRepetitions);

  const repetition =
    mode === "repetition"
      ? (repetitionProp ??
        repetitions.find((item) => item._id === repetitionId))
      : undefined;
  const room =
    mode === "room"
      ? baseDetails?.rooms.find((item) => item._id === roomId)
      : undefined;
  const instruments =
    mode === "repetition"
      ? (repetition?.instruments ?? [])
      : mode === "room"
        ? (room?.instruments ?? [])
        : (baseDetails?.instruments ?? []);
  const draftSlot = mode === "booking" ? orderDraft?.slot : null;
  const repetitionDate =
    mode === "repetition" && repetition
      ? toDate(repetition.slot.date)
      : draftSlot
        ? toDate(draftSlot.date)
        : undefined;
  const durationHours =
    mode === "repetition" && repetition
      ? Number(repetition.slot.period)
      : draftSlot
        ? Number(draftSlot.period)
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

  const background = location.state?.background ?? location;
  // индексы вкладок по режимам хранятся в записи истории: при возврате с фото вкладка восстанавливается
  const categoryIndexes: Partial<Record<string, number>> =
    location.state?.instrumentCategoryIndexes ?? {};

  const handleCategoryChange = (index: number) => {
    navigate(
      {
        pathname: location.pathname,
        search: location.search,
        hash: location.hash,
      },
      {
        replace: true,
        state: {
          ...location.state,
          instrumentCategoryIndexes: { ...categoryIndexes, [mode]: index },
        },
      },
    );
  };

  const handlePhotoSelect = (instrumentId: string) => {
    navigate(`/instruments/${instrumentId}`, {
      state: { background },
    });
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
      hideSlotPrice: mode === "booking",
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
    categoryInstruments.push({
      instrument,
      ...cardProps,
      onPhotoSelect: () => handlePhotoSelect(instrument._id),
    });
    categoryMap.set(instrument.category, categoryInstruments);
  });

  const categories: TInstrumentSelectionCategory[] = Array.from(
    categoryMap,
    ([name, categoryInstruments]) => ({
      name,
      instruments: categoryInstruments,
    }),
  );

  return (
    <InstrumentSelectionView
      categories={categories}
      initialCategoryIndex={categoryIndexes[mode]}
      onCategoryChange={handleCategoryChange}
    />
  );
};
