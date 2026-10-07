import { Meta, StoryObj } from "@storybook/react-webpack5";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import App from "../pages/app/app";
import { userSlice } from "../services/user/slice";
import guitaristAvatar from "./assets/profile/guitarist.jpg";

const createTestStore = (
  initialState?: Partial<ReturnType<typeof userSlice.reducer>>,
) => {
  return configureStore({
    reducer: { user: userSlice.reducer },
    preloadedState: { user: initialState },
  });
};

const meta: Meta<typeof App> = {
  title: "Pages/App",
  component: App,
  tags: ["autodocs"],
  decorators: [
    (Story, { globals }) => {
      const store = createTestStore(globals.initialState);
      return (
        <Provider store={store}>
          <Story />
        </Provider>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof App>;

export const HomePage: Story = {
  globals: {
    initialState: {
      user: {
        id: "1",
        name: "Test User",
        avatar: guitaristAvatar,
        phone: "+7 (999) 123-45-67",
        email: "user@example.com",
        login: "user123",
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
      },
      isAuthChecked: true,
    },
  },
};
