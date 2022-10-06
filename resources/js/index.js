import React from "react";
import ReactDOM from "react-dom";
import "./../css/index.css";
import AppRoutes from "./routes";
import { Provider } from "react-redux";
import { createStore } from "@reduxjs/toolkit";
import rootReducer from "./redux/rootReducer";

const store = createStore(rootReducer);

ReactDOM.render(
    <Provider store={store}>
        <AppRoutes />
    </Provider>,
    document.getElementById("root")
);
