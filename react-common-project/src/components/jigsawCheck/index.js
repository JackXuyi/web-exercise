/**
 * @author xuyi
 * 拼图验证
 * @flow
 */
import React, { Component } from "react";
import { Icon } from "antd";
import "./index.less";

type Props = {
  imgUrl: string,
  onSuccess?: () => void,
  onFailed?: () => void,
  className?: string,
  style?: Object,
  offset?: number,
  sliderSize?: number,
  deviation?: number
};
type State = {
  position: {
    x: number,
    y: number
  },
  imgSliderSize: {
    width: number,
    height: number
  },
  left: number,
  checkSuccess: boolean, // 是否验证通过
  checkFail: boolean, // 是否验证失败
  inElement: boolean // 是否在拖拽元素内部
};
class jigsawCheck extends Component<Props, State> {
  static defaultProps = {
    offset: 50,
    sliderSize: 50,
    deviation: 10
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      position: {
        x: 0,
        y: 0
      },
      imgSlider: {
        width: 0,
        height: 0,
        imgTop: 0,
        imgLeft: 0
      },
      left: 0,
      checkSuccess: false, // 是否验证通过
      checkFail: false, // 是否验证失败
      inElement: false // 是否在拖拽元素内部
    };
  }

  componentDidMount() {
    this.maxWidth =
      this.sliderImgContainter.offsetWidth - this.dragSlider.offsetWidth;
    const position = this.setImgBlankPosition();
    this.setImgSliderSize(position);
  }

  // 外部重置验证校验
  refresh = () => {
    const position = this.setImgBlankPosition();
    this.setImgSliderSize(position);
    this.setState({
      checkSuccess: false,
      checkFail: false,
      inElement: false,
      left: 0
    });
  };

  // 设置滑块位置
  setImgBlankPosition = (props: Props = this.props) => {
    const { offset, sliderSize } = props;
    const width = this.sliderImgContainter.offsetWidth;
    const height = this.sliderImgContainter.offsetHeight;
    const positionX =
      parseInt((width - 2 * offset - sliderSize) * Math.random()) + offset;
    const positionY =
      parseInt((height - 2 * offset - sliderSize) * Math.random()) + offset;
    const position = { x: positionX, y: positionY };
    this.setState({ position });
    return position;
  };

  // 获取图片大小
  setImgSliderSize = (
    position: { x: number, y: number },
    props: Props = this.props
  ) => {
    const { imgUrl, sliderSize } = props;
    const img = new Image();
    img.src = imgUrl;
    img.onload = () => {
      const { x, y } = position;
      this.imgWidth = img.width;
      this.imgHeight = img.height;
      const widthScale = img.width / this.sliderImgContainter.offsetWidth;
      const heightScale = img.height / this.sliderImgContainter.offsetHeight;
      this.setState({
        imgSlider: {
          imgLeft: x,
          imgTop: y,
          width: this.sliderImgContainter.offsetWidth,
          height: this.sliderImgContainter.offsetHeight
        }
      });
    };
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
        currLeft = this.maxWidth;
      }
      this.setState({ left: currLeft });
    }
  };

  // 离开事件或者鼠标释放时触发校验结束事件
  handleStop = (e: Event) => {
    e.nativeEvent.stopImmediatePropagation();
    const {
      inElement,
      left,
      position: { x }
    } = this.state;
    const { onFailed, onSuccess, deviation } = this.props;
    if (inElement) {
      this.setState({ inElement: false });
      if (left >= x - deviation && left <= x + deviation) {
        onSuccess && onSuccess();
        this.setState({ checkFail: false, checkSuccess: true });
      } else {
        onFailed && onFailed();
        this.setState({ checkFail: true, checkSuccess: false });
      }
    }
  };

  // render图片中的白块
  renderImgSlider = () => {
    const {
      position: { x, y }
    } = this.state;
    const { sliderSize } = this.props;
    if (x && y) {
      return (
        <div
          className="jigsawCheck-img-blank"
          style={{ left: x, top: y, width: sliderSize, height: sliderSize }}
        />
      );
    }
    return null;
  };

  // render 拖动图片
  renderDragSlider = () => {
    const { left, inElement, checkSuccess, checkFail } = this.state;
    const eventFlag = !(checkSuccess || checkFail);
    let icon = null;
    let className = "jigsawCheck-drag-slider";
    if (checkSuccess) {
      icon = <Icon type="check" theme="outlined" />;
      className = `${className} jigsawCheck-drag-slider-success`;
    } else if (checkFail) {
      icon = <Icon type="close" theme="outlined" />;
      className = `${className} jigsawCheck-drag-slider-failed`;
    } else {
      icon = <Icon type="right" theme="outlined" />;
    }
    return (
      <div
        className={className}
        style={{ left }}
        ref={ele => (this.dragSlider = ele)}
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
    const { imgUrl, sliderSize, className, style } = this.props;
    const {
      left,
      position: { y },
      imgSlider: { width, height, imgTop, imgLeft }
    } = this.state;
    return (
      <div className={`jigsawCheck ${className || ""}`}>
        <div
          className={"jigsawCheck-img-container"}
          ref={ele => (this.sliderImgContainter = ele)}
          style={{ ...style, backgroundImage: `url(${imgUrl})` }}
        >
          {this.renderImgSlider()}
          <div
            className="jigsawCheck-img-slider"
            style={{
              left,
              top: y,
              width: sliderSize,
              height: sliderSize,
              backgroundImage: `url(${imgUrl})`,
              backgroundPositionX: -imgLeft,
              backgroundPositionY: -imgTop,
              backgroundSize: `${width}px ${height}px`
            }}
          />
        </div>
        <div className="jigsawCheck-drag-container">
          <div
            className="jigsawCheck-drag-mask"
            style={{
              width: left ? left + 2 : 0,
              borderLeft: left ? null : "none"
            }}
          />
          {this.renderDragSlider()}
          向右滑动以完成验证
        </div>
      </div>
    );
  }
}

export default jigsawCheck;
