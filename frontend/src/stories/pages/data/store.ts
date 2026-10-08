import { combineSlices, configureStore } from "@reduxjs/toolkit";
import {
  basesSlice,
  initialState as initialBasesState,
} from "@services/bases/slice";
import { userSlice } from "@services/user/slice";
import { TUser } from "@utils/types";
import guitaristAvatar from "../../assets/profile/guitarist.jpg";
import { storyBases } from "./bases";

export const storyUser: TUser = {
  _id: "1",
  login: "Test User",
  avatar: guitaristAvatar,
  phone: "+7 (999) 123-45-67",
  email: "user@example.com",
  repetitions: [
    {
      _id: "repetition-1",
      base: "GrungeMoscow",
      address: "г. Москва, ул. Музыкальная, д. 93",
      room: "Green",
      slot: {
        _id: "slot-1",
        date: new Date("2026-10-15T17:00:00"),
        period: "3",
        price: 4800,
      },
      instruments: [],
      payment: "online",
    },
    {
      _id: "repetition-2",
      base: "Sound City",
      address: "г. Москва, ул. Артистов, д. 12",
      room: "Blue",
      slot: {
        _id: "slot-2",
        date: new Date("2026-10-22T19:00:00"),
        period: "2",
        price: 3200,
      },
      instruments: [],
      payment: "cash",
    },
  ],
};

const rootReducer = combineSlices(userSlice, basesSlice);

export const storyStore = configureStore({
  reducer: rootReducer,
  preloadedState: {
    user: {
      user: null,
      isAuthChecked: true,
    },
    bases: {
      ...initialBasesState,
      bases: storyBases.map(({ _id, title, image, address, rating }) => ({
        _id,
        title,
        image,
        address,
        rating,
      })),
      selectedBaseId: storyBases[0]._id,
      selectedBaseDetails: storyBases[0],
    },
  },
});
