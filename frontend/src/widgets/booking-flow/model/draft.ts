import type {
  TBase,
  TBookedInstrument,
  TOrderDraft,
  TRepetition,
  TRoom,
  TSlot,
} from "@utils/types";
import { getRangePrice } from "./slots";

export type TDraftSummary = {
  room: TRoom;
  start: Date;
  hours: number;
  slotPrice: number;
  instruments: TBookedInstrument[];
  total: number;
};

// Собирает итог бронирования из черновика; null, пока комната и слот не выбраны
export const getDraftSummary = (
  base: TBase,
  draft: TOrderDraft,
): TDraftSummary | null => {
  const room = base.rooms.find((item) => item._id === draft.roomid);

  if (!room || !draft.slot) {
    return null;
  }

  const start = new Date(draft.slot.date);
  const hours = Number(draft.slot.period);
  const slotPrice = getRangePrice(room, start, hours);
  const instruments = base.instruments
    .filter((instrument) => draft.instrumentsId.includes(instrument._id))
    .map((instrument): TBookedInstrument => {
      const slot: TSlot = {
        _id: `${instrument._id}-${draft.slot?.date}`,
        date: start,
        period: draft.slot?.period ?? "1",
        price: (instrument.price ?? 0) * hours,
      };
      return { ...instrument, slot };
    });
  const total =
    slotPrice + instruments.reduce((sum, item) => sum + item.slot.price, 0);

  return { room, start, hours, slotPrice, instruments, total };
};

export const buildRepetition = (
  base: TBase,
  draft: TOrderDraft,
  summary: TDraftSummary,
): TRepetition => ({
  _id: "draft",
  base: base.title,
  address: base.address,
  room: summary.room.title,
  slot: {
    _id: `${summary.room._id}-${draft.slot?.date}`,
    date: summary.start,
    period: String(summary.hours),
    price: summary.slotPrice,
  },
  instruments: summary.instruments,
  payment: draft.payment ?? "cash",
});
