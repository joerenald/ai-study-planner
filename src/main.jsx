import React from "react";

import ReactDOM
from "react-dom/client";

import App from "./App";

import "./index.css";
import "react-calendar/dist/Calendar.css";
import {
  BrowserRouter,
} from "react-router-dom";

import {
  PlannerProvider,
} from "./context/PlannerContext";

import {
  AuthProvider,
} from "./context/AuthContext";

ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <BrowserRouter>

  <AuthProvider>

    <PlannerProvider>

      <App />

    </PlannerProvider>

  </AuthProvider>

</BrowserRouter>
);