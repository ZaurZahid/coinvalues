import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import reducer from "./reducers";

import { watchCurrencies } from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
  // composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(watchCurrencies);

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
