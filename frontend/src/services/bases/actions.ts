import { createAsyncThunk } from "@reduxjs/toolkit";
import { getBaseByIdApi, getBasesApi } from "@utils/api";

export const fetchBases = createAsyncThunk("bases/fetchBases", getBasesApi);

export const fetchBaseDetails = createAsyncThunk(
  "bases/fetchBaseDetails",
  getBaseByIdApi,
);
