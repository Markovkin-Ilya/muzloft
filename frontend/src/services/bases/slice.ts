import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TBase, TOrderDraft, TSlot, TRoom } from "@utils/types";
import { fetchBaseDetails, fetchBases } from "./actions";

export type TBaseCardData = Pick<
  TBase,
  "_id" | "title" | "image" | "address" | "rating"
>;

type TBasesState = {
  bases: TBaseCardData[];
  baseId: string | null;
  baseDetails: TBase | null;
  orderDraft: TOrderDraft | null;
  bookingProgress: TBookingProgress;
  room: TRoom | null;
};

export type TBookingProgress = {
  stepIndex: number;
  showBookedInstruments: boolean;
};

const initialBookingProgress: TBookingProgress = {
  stepIndex: 0,
  showBookedInstruments: false,
};

export const initialState: TBasesState = {
  bases: [],
  baseId: null,
  baseDetails: null,
  orderDraft: null,
  bookingProgress: initialBookingProgress,
  room: null,
};

export const basesSlice = createSlice({
  name: "bases",
  initialState,
  reducers: {
    setBases: (state, action: PayloadAction<TBaseCardData[]>) => {
      state.bases = action.payload;
    },
    setBaseId: (state, action: PayloadAction<string | null>) => {
      state.baseId = action.payload;
      state.baseDetails = null;
    },
    setBaseDetails: (state, action: PayloadAction<TBase | null>) => {
      state.baseDetails = action.payload;
      state.baseId = action.payload?._id ?? null;
    },
    startOrderDraft: (
      state,
      action: PayloadAction<{ baseid: string; roomid?: string | null }>,
    ) => {
      const { baseid, roomid } = action.payload;
      const current = state.orderDraft;

      // черновик того же бронирования сохраняется при уходе на фото и возврате
      if (current?.baseid === baseid && current.roomid === (roomid ?? null)) {
        return;
      }

      state.orderDraft = {
        baseid,
        roomid: roomid ?? null,
        slot: null,
        instrumentsId: [],
        payment: null,
      };
      state.bookingProgress = initialBookingProgress;
    },
    setBookingStepIndex: (state, action: PayloadAction<number>) => {
      state.bookingProgress.stepIndex = action.payload;
    },
    setShowBookedInstruments: (state, action: PayloadAction<boolean>) => {
      state.bookingProgress.showBookedInstruments = action.payload;
    },
    setOrderDraftRoom: (state, action: PayloadAction<string>) => {
      if (!state.orderDraft || state.orderDraft.roomid === action.payload) {
        return;
      }
      state.orderDraft.roomid = action.payload;
      state.orderDraft.slot = null;
      state.orderDraft.instrumentsId = [];
    },
    setOrderDraftSlot: (
      state,
      action: PayloadAction<{
        date: string;
        period: TSlot["period"];
      } | null>,
    ) => {
      if (!state.orderDraft) {
        return;
      }
      const slot = action.payload;
      const current = state.orderDraft.slot;
      if (current?.date !== slot?.date || current?.period !== slot?.period) {
        state.orderDraft.instrumentsId = [];
      }
      state.orderDraft.slot = slot;
    },
    setOrderDraftPayment: (
      state,
      action: PayloadAction<TOrderDraft["payment"]>,
    ) => {
      if (state.orderDraft) {
        state.orderDraft.payment = action.payload;
      }
    },
    toggleOrderInstrument: (state, action: PayloadAction<string>) => {
      if (!state.orderDraft) {
        return;
      }

      const instrumentIndex = state.orderDraft.instrumentsId.indexOf(
        action.payload,
      );

      if (instrumentIndex === -1) {
        state.orderDraft.instrumentsId.push(action.payload);
      } else {
        state.orderDraft.instrumentsId.splice(instrumentIndex, 1);
      }
    },
    clearOrderDraft: (state) => {
      state.orderDraft = null;
      state.bookingProgress = initialBookingProgress;
    },
    clearBase: (state) => {
      state.baseId = null;
      state.baseDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBases.fulfilled, (state, action) => {
        state.bases = action.payload.map(
          ({ _id, title, image, address, rating }) => ({
            _id,
            title,
            image,
            address,
            rating,
          }),
        );
      })
      .addCase(fetchBaseDetails.pending, (state, action) => {
        state.baseId = action.meta.arg;
        state.baseDetails = null;
      })
      .addCase(fetchBaseDetails.fulfilled, (state, action) => {
        if (state.baseId !== action.meta.arg) {
          return;
        }
        state.baseDetails = action.payload;
      });
  },
  selectors: {
    selectBases: (state) => state.bases,
    selectBaseId: (state) => state.baseId,
    selectBaseDetails: (state) => state.baseDetails,
    selectOrderDraft: (state) => state.orderDraft,
    selectBookingProgress: (state) => state.bookingProgress,
    selectRoom: (state, roomId?: string | null) =>
      roomId
        ? (state.baseDetails?.rooms.find((room) => room._id === roomId) ?? null)
        : null,
  },
});

export const {
  selectBases,
  selectBaseId,
  selectBaseDetails,
  selectOrderDraft,
  selectBookingProgress,
  selectRoom,
} = basesSlice.selectors;
export const {
  setBases,
  setBaseId,
  setBaseDetails,
  startOrderDraft,
  setBookingStepIndex,
  setShowBookedInstruments,
  setOrderDraftRoom,
  setOrderDraftSlot,
  setOrderDraftPayment,
  toggleOrderInstrument,
  clearOrderDraft,
  clearBase,
} = basesSlice.actions;
