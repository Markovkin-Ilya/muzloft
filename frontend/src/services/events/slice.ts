import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TEvent } from "@utils/types";
import { fetchEventDetails, fetchEvents } from "./actions";

export type TEventCardData = Pick<
  TEvent,
  "id" | "title" | "subtitle" | "description" | "image"
>;

type TEventsState = {
  events: TEventCardData[];
  eventId: string | null;
  eventDetails: TEvent | null;
};

export const initialState: TEventsState = {
  events: [],
  eventId: null,
  eventDetails: null,
};

export const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setEvents: (state, action: PayloadAction<TEventCardData[]>) => {
      state.events = action.payload;
    },
    setEventId: (state, action: PayloadAction<string | null>) => {
      state.eventId = action.payload;
      state.eventDetails = null;
    },
    setEventDetails: (state, action: PayloadAction<TEvent | null>) => {
      state.eventDetails = action.payload;
      state.eventId = action.payload?.id ?? null;
    },
    clearEvent: (state) => {
      state.eventId = null;
      state.eventDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.events = action.payload.map(
          ({ id, title, subtitle, description, image }) => ({
            id,
            title,
            subtitle,
            description,
            image,
          }),
        );
      })
      .addCase(fetchEventDetails.pending, (state, action) => {
        state.eventId = action.meta.arg;
        state.eventDetails = null;
      })
      .addCase(fetchEventDetails.fulfilled, (state, action) => {
        if (state.eventId !== action.meta.arg) {
          return;
        }
        state.eventDetails = action.payload;
      });
  },
  selectors: {
    selectEvents: (state) => state.events,
    selectEventId: (state) => state.eventId,
    selectEventDetails: (state) => state.eventDetails,
  },
});

export const { selectEvents, selectEventId, selectEventDetails } =
  eventsSlice.selectors;
export const { setEvents, setEventId, setEventDetails, clearEvent } =
  eventsSlice.actions;
