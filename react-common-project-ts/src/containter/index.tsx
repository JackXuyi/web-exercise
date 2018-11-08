/**
 * @author xuyi
 */
import * as React from "react";
import Header from "./header";
import "./index.less";

type Props = {
  children: any;
};

const Containter = (props: Props) => {
  const { children } = props;
  return (
    <div className="main">
      <div className="header">
        <Header />
      </div>
      <div className="content">{children}</div>
      <div className="footer">footer</div>
    </div>
  );
};

export default Containter;
