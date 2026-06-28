import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";

import * as TemporalLite from "temporal-polyfill-lite/shim";
import "temporal-polyfill-lite/types/global";

TemporalLite.install(false);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
