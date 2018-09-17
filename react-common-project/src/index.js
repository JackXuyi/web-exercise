/**
 * @author xuyi
 */
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./container";
import Route from "./router";
import store from "./redux/store";
import DevTools from "./redux/devtools";

if (process.env.NODE_ENV !== "production") {
  console.log("this is not production");
}

ReactDOM.render(
  <Provider store={store}>
    <App>
      <Route />
      {process.env.NODE_ENV !== "production" ? <DevTools /> : null}
    </App>
  </Provider>,
  document.getElementById("root")
);
