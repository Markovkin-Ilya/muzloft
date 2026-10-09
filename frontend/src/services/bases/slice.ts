import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TBase, TOrderDraft, TSlot } from "@utils/types";
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
};

export const initialState: TBasesState = {
  bases: [],
  baseId: null,
  baseDetails: null,
  orderDraft: null,
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
    setOrderDraftSlot: (
      state,
      action: PayloadAction<{
        roomid: string;
        date: string;
        period: TSlot["period"];
      }>,
    ) => {
      const slot = action.payload;
      const hasSameSlot =
        state.orderDraft?.roomid === slot.roomid &&
        state.orderDraft?.slot.date === slot.date &&
        state.orderDraft.slot.period === slot.period;

      if (!hasSameSlot) {
        state.orderDraft = {
          roomid: slot.roomid,
          slot: { date: slot.date, period: slot.period },
          instrumentsId: [],
        };
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
  },
});

export const {
  selectBases,
  selectBaseId,
  selectBaseDetails,
  selectOrderDraft,
} = basesSlice.selectors;
export const {
  setBases,
  setBaseId,
  setBaseDetails,
  setOrderDraftSlot,
  toggleOrderInstrument,
  clearOrderDraft,
  clearBase,
} = basesSlice.actions;
