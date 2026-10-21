import type { TBase, TRoom, TTariff } from "@utils/types";

export const BOOKING_DAYS = 14;
export const DEFAULT_WORKING_HOURS = { from: 10, to: 22 };
export const DEFAULT_HOUR_PRICE = 1000;
const HOUR_MS = 60 * 60 * 1000;

export const startOfDay = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

export const getBookingDays = (today: Date, count = BOOKING_DAYS) => {
  const start = startOfDay(today);
  return Array.from(
    { length: count },
    (_, index) =>
      new Date(start.getFullYear(), start.getMonth(), start.getDate() + index),
  );
};

export const getDayHours = (workingHours: TBase["workingHours"]) => {
  const hours = workingHours ?? DEFAULT_WORKING_HOURS;
  const from = hours === "24h" ? 0 : hours.from;
  const to = hours === "24h" ? 24 : hours.to;
  return Array.from({ length: Math.max(to - from, 0) }, (_, i) => from + i);
};

export const getHourStart = (day: Date, hour: number) =>
  new Date(day.getFullYear(), day.getMonth(), day.getDate(), hour);

const matchesTariff = (tariff: TTariff, start: Date) =>
  (!tariff.weekdays || tariff.weekdays.includes(start.getDay())) &&
  (tariff.fromHour === undefined || start.getHours() >= tariff.fromHour) &&
  (tariff.toHour === undefined || start.getHours() < tariff.toHour);

export const getHourPrice = (room: TRoom, start: Date) =>
  room.tariffs?.find((tariff) => matchesTariff(tariff, start))?.price ??
  room.basePrice ??
  DEFAULT_HOUR_PRICE;

export const isHourBusy = (room: TRoom, start: Date, now: Date) => {
  const startMs = start.getTime();
  const endMs = startMs + HOUR_MS;

  if (startMs <= now.getTime()) {
    return true;
  }

  return room.slots.some((slot) => {
    const bookedStart = new Date(slot.date).getTime();
    const bookedEnd = bookedStart + (Number(slot.period) || 1) * HOUR_MS;
    return startMs < bookedEnd && bookedStart < endMs;
  });
};

export const getRangePrice = (room: TRoom, start: Date, hours: number) =>
  Array.from({ length: hours }, (_, i) =>
    getHourPrice(room, new Date(start.getTime() + i * HOUR_MS)),
  ).reduce((sum, price) => sum + price, 0);

export const getSlotEnd = (start: Date, hours: number) =>
  new Date(start.getTime() + hours * HOUR_MS);

export type THourRange = { start: number; end: number } | null;

// Выбор допускает только непрерывный диапазон часов
export const toggleHourInRange = (
  range: THourRange,
  hour: number,
): THourRange => {
  if (!range) {
    return { start: hour, end: hour };
  }
  if (hour === range.start - 1) {
    return { ...range, start: hour };
  }
  if (hour === range.end + 1) {
    return { ...range, end: hour };
  }
  if (hour === range.start && hour === range.end) {
    return null;
  }
  if (hour === range.start) {
    return { ...range, start: hour + 1 };
  }
  if (hour === range.end) {
    return { ...range, end: hour - 1 };
  }
  return { start: hour, end: hour };
};

export const getPriceTones = (prices: number[]) => {
  const unique = Array.from(new Set(prices)).sort((a, b) => a - b);
  return new Map(unique.map((price, index) => [price, index]));
};
