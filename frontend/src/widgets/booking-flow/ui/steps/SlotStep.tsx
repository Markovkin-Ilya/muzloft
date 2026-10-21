import { FC, useMemo, useState } from "react";
import { setOrderDraftSlot } from "@services/bases/slice";
import { useDispatch } from "@services/store";
import {
  getBookingDays,
  getDayHours,
  getHourPrice,
  getHourStart,
  getPriceTones,
  isHourBusy,
  startOfDay,
  THourRange,
  toggleHourInRange,
} from "../../model";
import { SlotPickerUI, TSlotPickerDay, TSlotPickerHour } from "../SlotPickerUI";
import type { TBookingStepProps } from "./types";

const MAX_TONE = 2;

const dayKey = (date: Date) =>
  `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

const formatTime = (hour: number) => `${String(hour).padStart(2, "0")}:00`;

export const SlotStep: FC<TBookingStepProps> = ({ base, draft }) => {
  const dispatch = useDispatch();
  const [now] = useState(() => new Date());
  const room = base.rooms.find((item) => item._id === draft.roomid);
  const days = useMemo(() => getBookingDays(now), [now]);
  const hours = useMemo(() => getDayHours(base.workingHours), [base]);
  const draftStart = draft.slot ? new Date(draft.slot.date) : null;
  const [activeDay, setActiveDay] = useState(() =>
    startOfDay(draftStart ?? now),
  );

  if (!room) {
    return null;
  }

  const draftRange: THourRange =
    draftStart && dayKey(draftStart) === dayKey(activeDay) && draft.slot
      ? {
          start: draftStart.getHours(),
          end: draftStart.getHours() + Number(draft.slot.period) - 1,
        }
      : null;

  const hourItems = hours.map((hour) => {
    const start = getHourStart(activeDay, hour);
    return {
      hour,
      busy: isHourBusy(room, start, now),
      price: getHourPrice(room, start),
    };
  });
  const tones = getPriceTones(hourItems.map((item) => item.price));
  const getTone = (price: number) => Math.min(tones.get(price) ?? 0, MAX_TONE);

  const pickerDays: TSlotPickerDay[] = days.map((day) => ({
    key: dayKey(day),
    date: day.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
    }),
    weekday: day.toLocaleDateString("ru-RU", { weekday: "short" }),
  }));
  const pickerHours: TSlotPickerHour[] = hourItems.map((item) => ({
    hour: item.hour,
    label: formatTime(item.hour),
    busy: item.busy,
    selected:
      !!draftRange &&
      item.hour >= draftRange.start &&
      item.hour <= draftRange.end,
    tone: getTone(item.price),
  }));
  const legend = Array.from(tones, ([price, tone]) => ({
    price,
    tone: Math.min(tone, MAX_TONE),
  }));

  const handleHourClick = (hour: number) => {
    const range = toggleHourInRange(draftRange, hour);
    dispatch(
      setOrderDraftSlot(
        range
          ? {
              date: getHourStart(activeDay, range.start).toISOString(),
              period: String(range.end - range.start + 1),
            }
          : null,
      ),
    );
  };

  const handleDayChange = (key: string) => {
    const day = days.find((item) => dayKey(item) === key);
    if (day) {
      setActiveDay(day);
      dispatch(setOrderDraftSlot(null));
    }
  };

  return (
    <SlotPickerUI
      days={pickerDays}
      activeDayKey={dayKey(activeDay)}
      hours={pickerHours}
      legend={legend}
      onDayChange={handleDayChange}
      onHourClick={handleHourClick}
    />
  );
};
