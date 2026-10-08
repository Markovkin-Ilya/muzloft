import { createAsyncThunk } from "@reduxjs/toolkit";
import { getEventByIdApi, getEventsApi } from "@utils/api";

export const fetchEvents = createAsyncThunk("events/fetchEvents", getEventsApi);

export const fetchEventDetails = createAsyncThunk(
  "events/fetchEventDetails",
  getEventByIdApi,
);
