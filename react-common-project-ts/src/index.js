/**
 * @author xuyi
 */
import React, { Component } from "react";
import ReactDOM from "react-dom";
import Containter from "./containter";
import Routes from "./routes";

if (process.env.NODE_ENV !== "production") {
  console.log("this is not production");
}

ReactDOM.render(
  <Containter>
    <Routes />
  </Containter>,
  document.getElementById("root")
);
