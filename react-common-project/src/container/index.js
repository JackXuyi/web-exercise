/**
 * @author xuyi
 */

import React, { Component } from "react";
import Header from "./header";
import Footer from "./footer";
import "./index.less";

const containter = props => {
  const { children } = props;
  return (
    <div className="main">
      <Header />
      <div className="content">{children}</div>
      <Footer />
    </div>
  );
};

export default containter;
