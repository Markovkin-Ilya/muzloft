import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TBase } from "@utils/types";
import { fetchBaseDetails, fetchBases } from "./actions";

export type TBaseCardData = Pick<
  TBase,
  "_id" | "title" | "image" | "address" | "rating"
>;

type TBasesState = {
  bases: TBaseCardData[];
  baseId: string | null;
  baseDetails: TBase | null;
};

export const initialState: TBasesState = {
  bases: [],
  baseId: null,
  baseDetails: null,
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
  },
});

export const { selectBases, selectBaseId, selectBaseDetails } =
  basesSlice.selectors;
export const { setBases, setBaseId, setBaseDetails, clearBase } =
  basesSlice.actions;
