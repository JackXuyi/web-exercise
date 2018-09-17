/**
 * @author xuyi
 */

import React, { Component } from "react";
import "./index.less";

const containter = props => {
  const { children } = props;
  return <div className="main">{children}</div>;
};

export default containter;
