/**
 * @author xuyi
 * @flow
 */
import React, { Component } from "react";
import SlideCheck from "components/slideCheck";
import { Button } from "antd";
import "./index.less";

type Props = {
  //
};
const slideCheck = (props: Props) => {
  let silder = null;
  const onClick = () => {
    silder && silder.refresh();
  };
  return (
    <div className="slideCheck">
      <SlideCheck
        ref={ele => (silder = ele)}
        style={{ width: 200 }}
        className="slideCheck-check"
        onSuccess={() => console.log("校验成功")}
        onFailed={() => console.log("校验失败")}
      />
      <Button type="primary" onClick={onClick}>
        重试
      </Button>
    </div>
  );
};

export default slideCheck;
