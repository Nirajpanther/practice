import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Default from "../layout/Default";
import { Main } from "../layout/Main";
import routes1 from "./routes";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Main />}>
          {routes1
            .filter((el, i) => !el.auth)
            .map((elem, i) => {
              return (
                <Route
                  key={i}
                  exact
                  path={elem.path}
                  element={<elem.component />}
                />
              );
            })}
        </Route>
        <Route element={<Default />}>
          {routes1
            .filter((el, i) => el.auth)
            .map((elem, i) => {
              return (
                <Route
                  key={i}
                  exact
                  path={elem.path}
                  element={<elem.component />}
                />
              );
            })}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
