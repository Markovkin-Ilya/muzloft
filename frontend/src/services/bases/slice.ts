import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TBase } from "@utils/types";

export type TBaseCardData = Pick<
  TBase,
  "_id" | "title" | "image" | "address" | "rating"
>;

type TBasesState = {
  bases: TBaseCardData[];
  selectedBaseId: string | null;
  selectedBaseDetails: TBase | null;
};

export const initialState: TBasesState = {
  bases: [],
  selectedBaseId: null,
  selectedBaseDetails: null,
};

export const basesSlice = createSlice({
  name: "bases",
  initialState,
  reducers: {
    setBases: (state, action: PayloadAction<TBaseCardData[]>) => {
      state.bases = action.payload;
    },
    setSelectedBaseId: (state, action: PayloadAction<string | null>) => {
      state.selectedBaseId = action.payload;
      state.selectedBaseDetails = null;
    },
    setSelectedBaseDetails: (state, action: PayloadAction<TBase | null>) => {
      state.selectedBaseDetails = action.payload;
      state.selectedBaseId = action.payload?._id ?? null;
    },
    clearSelectedBase: (state) => {
      state.selectedBaseId = null;
      state.selectedBaseDetails = null;
    },
  },
  selectors: {
    selectBases: (state) => state.bases,
    selectSelectedBaseId: (state) => state.selectedBaseId,
    selectSelectedBaseDetails: (state) => state.selectedBaseDetails,
  },
});

export const {
  selectBases,
  selectSelectedBaseId,
  selectSelectedBaseDetails,
} = basesSlice.selectors;
export const {
  setBases,
  setSelectedBaseId,
  setSelectedBaseDetails,
  clearSelectedBase,
} = basesSlice.actions;
