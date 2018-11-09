/**
 * @author xuyi
 * @flow
 */
import React, { Component } from "react";
import SlideCheck from "components/slideCheck";
import JigsawCheck from "components/jigsawCheck";
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
  let imgSlider = null;
  const imgClick = () => {
    imgSlider && imgSlider.refresh();
  };
  return (
    <div className="slideCheck">
      <div className="slideCheck-item">
        <h2 className="slideCheck-item-header">滑动验证码</h2>
        <SlideCheck
          ref={ele => (silder = ele)}
          className="slideCheck-check"
          onSuccess={() => console.log("滑动校验成功")}
          onFailed={() => console.log("滑动校验失败")}
        />
        <Button type="primary" onClick={onClick}>
          重试
        </Button>
      </div>
      <div className="slideCheck-item">
        <h2 className="slideCheck-item-header">拼图验证码</h2>
        <JigsawCheck
          ref={ele => (imgSlider = ele)}
          className="slideCheck-img"
          onSuccess={() => console.log("图片滑动校验成功")}
          onFailed={() => console.log("图片滑动校验失败")}
          imgUrl="https://salary-assets-front.dingtalent.com/img/201810/DT90dh446u2PMx5q9Zj91612P9E.png"
        />
        <Button type="primary" onClick={imgClick}>
          重试
        </Button>
      </div>
    </div>
  );
};

export default slideCheck;
