import React from "react";
import * as ReactDOMClient from "react-dom/client";
import { App, AppProviders } from "@app";

import "./index.css";
import "./assets/fonts/fonts.css";

const container = document.getElementById("root") as HTMLElement;
const root = ReactDOMClient.createRoot(container!);

root.render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>,
);
