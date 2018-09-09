/**
 * Created by Allan on 2017/09/13.
 */
import React from "react";
import { Layout } from "antd";
import Header from "./header";
import Footer from "./footer";
import "./index.less";

const { Content } = Layout;

const App = props => {
  return (
    <div>
      <Header />
      <Content className="main-layout-content">{props.children}</Content>
      <Footer />
    </div>
  );
};

export default App;
