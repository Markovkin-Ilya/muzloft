import React from 'react';
import type { Preview } from '@storybook/react-webpack5'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@services/store';
import '@utils/variables.css';
import '@assets/fonts/fonts.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Provider store={store}>
          <div style={{ margin: 0, padding: 0, height: '100%', overflow: 'hidden' }}>
            <Story />
          </div>
        </Provider>
      </BrowserRouter>
    )
  ],
  initialGlobals: {
    layout: 'fullscreen',
  }
};

export default preview;
