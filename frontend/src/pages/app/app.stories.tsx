import { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import App from './app';
import { userSlice } from '@services/user/slice';

const createTestStore = (initialState?: Partial<ReturnType<typeof userSlice.reducer>>) => {
  return configureStore({
    reducer: { user: userSlice.reducer },
    preloadedState: { user: initialState },
  });
};

const meta: Meta<typeof App> = {
  title: 'Pages/App',
  component: App,
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

export const HomePage: Story = {};

export const ProfilePage: Story = {
  globals: {
    initialState: {
      user: { id: '1', name: 'Test User' },
      isAuthChecked: true,
    },
  },
};
