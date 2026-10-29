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
  room: TRoom | null;
};

export const initialState: TBasesState = {
  bases: [],
  baseId: null,
  baseDetails: null,
  orderDraft: null,
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
      state.orderDraft = {
        baseid: action.payload.baseid,
        roomid: action.payload.roomid ?? null,
        slot: null,
        instrumentsId: [],
        payment: null,
      };
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
  selectRoom,
} = basesSlice.selectors;
export const {
  setBases,
  setBaseId,
  setBaseDetails,
  startOrderDraft,
  setOrderDraftRoom,
  setOrderDraftSlot,
  setOrderDraftPayment,
  toggleOrderInstrument,
  clearOrderDraft,
  clearBase,
} = basesSlice.actions;
