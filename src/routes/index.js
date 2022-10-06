import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import routes1 from "./routes";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {routes1.map((elem, i) => {
          return (
            <Route
              key={i}
              exact
              path={elem.path}
              element={<elem.component />}
            />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
