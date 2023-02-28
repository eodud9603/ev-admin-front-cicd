import React from "react";

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

// Import Routes all
import { userRoutes, authRoutes } from "./routes/allRoutes";

// Import all middleware
import Authmiddleware from "./routes/middleware/Authmiddleware";

// layouts Format
import VerticalLayout from "./components/VerticalLayout/";
import NonAuthLayout from "./components/NonAuthLayout";
// Import scss
import "./assets/scss/theme.scss";
import "./assets/scss/preloader.scss";
import { mainLoader } from "src/pages/Main/loader/mainLoader";
import { Playground } from "src/components/ProSideBar/Playground";

function getLayout() {
  const layoutCls: any = VerticalLayout;
  return layoutCls;
}

const Layout: any = getLayout();

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      // id={'root'}
      loader={mainLoader}
      // errorElement={}
    >
      {authRoutes.map((route, idx) => (
        <Route
          path={route.path}
          element={<NonAuthLayout>{route.element}</NonAuthLayout>}
          key={idx}
        />
      ))}

      {userRoutes.map((route, idx) => (
        <Route
          path={route.path}
          element={
            <Authmiddleware>
              <Playground>{route.element}</Playground>
            </Authmiddleware>
          }
          key={idx}
          // errorElement={}
        />
      ))}
    </Route>
  )
);
