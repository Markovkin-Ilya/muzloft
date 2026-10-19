import React from "react";
import type { Preview } from "@storybook/react-webpack5";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../src/services/store";
import "@utils/variables.css";
import "@assets/fonts/fonts.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Provider store={store}>
          <div
            style={{
              margin: 0,
              padding: 0,
              height: "100%",
              overflow: "hidden",
            }}
          >
            <Story />
          </div>
          <div id="modals" />
          <div id="modal-overlay" />
        </Provider>
      </MemoryRouter>
    ),
  ],
};

export default preview;
