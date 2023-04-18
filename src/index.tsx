import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "./helpers/store/index";
import "@fullcalendar/react/dist/vdom";
import { router } from "./App";
import { ProSidebarProvider } from "react-pro-sidebar";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={configureStore({})}>
    <ProSidebarProvider>
      <RouterProvider router={router} />
    </ProSidebarProvider>
  </Provider>
);
