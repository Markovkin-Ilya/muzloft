import React from 'react';
import type { Preview } from '@storybook/react-webpack5'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@services/store';
import '../src/utils/variables.css';
import '../src/utils/styles.css';
import '../src/assets/fonts/fonts.css';

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
          <div style={{ padding: 20, width: 'fit-content' }}>
            <Story />
          </div>
        </Provider>
      </BrowserRouter>
    )
  ]
};

export default preview;
