/**
 * @author xuyi
 */
import React, { Component } from "react";
import ReactDOM from "react-dom";
import Home from "./pages/home";

if (process.env.NODE_ENV !== "production") {
  console.log("this is not production");
}

ReactDOM.render(
  <h1>
    <Home />
    hello ts
  </h1>,
  document.getElementById("root")
);
