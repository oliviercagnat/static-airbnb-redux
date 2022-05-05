// We amend a lot the index.js
// it importes and wires everything.

// external modules
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

// 1: We import applyMiddleware

// 8: ReduxDevTools: we import 'compose' from redux
import { createStore, combineReducers, applyMiddleware, compose } from "redux";

// internal modules
import "../assets/stylesheets/application.scss";
import App from "./components/app";

// Reducers
import flatsReducer from "./reducers/flats_reducer";
import selectedFlatReducer from "./reducers/selected_flat_reducer";

// 2: We import the logger
import { logger } from 'redux-logger';

// 5: We import the reduxPromise
import reduxPromise from 'redux-promise';

const reducers = combineReducers({
  flats: flatsReducer,
  selectedFlat: selectedFlatReducer
});

// 3: We create a variable middlewares where we apply the middleware on the logger
// 7: We add the reduxPromise to applyMiddleware
// See actions/index.js (7)

// 9: We will build the composeEnhancers method by taking the default extension from Redux
// 10: we wrap the middleware with composeEnhancers
// 11: We have now in our ReduxDevTool all the actions.
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = composeEnhancers(applyMiddleware(logger, reduxPromise));

// render an instance of the component in the DOM

// the empty {} would be the initial redux state.
// if we want to initialize a redux state which something else than empty object, it's possible.
// will do it on with Rails later.

// 4: We createStore with the middlewares.
ReactDOM.render(
  <Provider store={createStore(reducers, {}, middlewares)}>
    <App />
  </Provider>,
  document.getElementById("app")
);
