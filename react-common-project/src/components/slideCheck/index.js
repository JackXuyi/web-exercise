/**
 * @author xuyi
 * @flow
 */
import React, { Component } from "react";
import { Icon } from "antd";
import "./index.less";

type Props = {
  onSuccess?: () => void,
  onFailed?: () => void,
  className?: string,
  style?: Object,
  ref?: Object
};
type State = {
  left: number
};
class slideCheck extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      left: 0,
      checkSuccess: false, // 是否验证通过
      checkFail: false, // 是否验证失败
      inElement: false // 是否在拖拽元素内部
    };
  }

  componentDidMount() {
    this.maxWidth = this.slideContainer.offsetWidth - this.slider.offsetWidth;
  }

  // 外部重置验证校验
  refresh = () => {
    this.setState({
      checkSuccess: false,
      checkFail: false,
      inElement: false,
      left: 0
    });
  };

  // 鼠标按下事件
  handleMouseDown = (e: Event) => {
    e.nativeEvent.stopImmediatePropagation();
    this.setState({ inElement: true });
  };

  // 移动事件
  handleMouseMove = (e: Event) => {
    const { movementX } = e.nativeEvent;
    const { left } = this.state;
    if (movementX) {
      let currLeft = left + movementX;
      if (this.maxWidth < left + movementX) {
        const { onSuccess } = this.props;
        currLeft = this.maxWidth;
        onSuccess && onSuccess();
        this.setState({ checkFail: false, checkSuccess: true });
      }
      this.setState({ left: currLeft });
    }
  };

  // 离开事件或者鼠标释放时触发校验结束事件
  handleStop = (e: Event) => {
    e.nativeEvent.stopImmediatePropagation();
    const { inElement, left } = this.state;
    const { onFailed } = this.props;
    if (inElement) {
      this.setState({ inElement: false });
      if (left < this.maxWidth) {
        onFailed && onFailed();
        this.setState({ checkFail: true, checkSuccess: false });
      }
    }
  };

  // render拖动滑块
  renderSlider = () => {
    const { left, inElement, checkSuccess, checkFail } = this.state;
    const eventFlag = !(checkSuccess || checkFail);
    let icon = null;
    let className = "component-slide-slider";
    if (checkSuccess) {
      icon = <Icon type="check" theme="outlined" />;
      className = `${className} component-slide-slider-success`;
    } else if (checkFail) {
      icon = <Icon type="close" theme="outlined" />;
      className = `${className} component-slide-slider-failed`;
    } else {
      icon = <Icon type="right" theme="outlined" />;
    }
    return (
      <div
        className={className}
        style={{ left }}
        ref={ele => (this.slider = ele)}
        onMouseDown={eventFlag ? this.handleMouseDown : null}
        onMouseLeave={eventFlag ? this.handleStop : null}
        onMouseUp={eventFlag ? this.handleStop : null}
        onMouseMove={eventFlag && inElement ? this.handleMouseMove : null}
      >
        {icon}
      </div>
    );
  };

  render() {
    const { className, style } = this.props;
    const { left } = this.state;
    return (
      <div
        ref={ele => (this.slideContainer = ele)}
        className={`component-slide-check ${className || ""}`}
        style={{ ...style }}
      >
        <div
          className="component-slide-mask"
          style={{
            width: left ? left + 2 : 0,
            borderLeft: left ? null : "none"
          }}
        />
        {this.renderSlider()}
        向右滑动以完成验证
      </div>
    );
  }
}

export default slideCheck;
