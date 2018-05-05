/**
 * @author xuyi
 * 描述：
 * 基于canvas的图片缩放、拖拽功能
 */

function DragZoom(element, src, option = {}) {
  const {
    scale = 1, adaptive = true, delay = 0, minScale = 0.5, maxScale = 3,
  } = option;
  this._ele = element; // 组件挂载的节点
  this._img = src; // 图片源
  this._scale = scale; // 缩放大小
  this._delay = delay; // 延时缩放大小，适应有动画的页面
  this._adaptive = adaptive; // 是否自适应图片的大小
  this._minScale = minScale; // 最小缩小倍数
  this._maxScale = maxScale; // 最大放大倍数
  this._szie = null; // 容器大小，即canvas的大小
  this._ctx = null; // canvas标签的内容
  this._bbox = null; // canvas外边框
  this._canvas = null; // canvas标签
  this._image = new Image(); // 图片对象
  this._lastCenter = null; // 前一次的中心
  this._currCenter = null; // 当前的中心
  this._move = null; // 移动的距离
  this._isOutFlag = false; // 是否移出canvas外
  this._isMoving = false; // 是否拖动鼠标
  this._lastPoint = null;
  this._imageDrawArea = { x: 0, y: 0, width: 0, height: 0, }; // 记录canvas上绘制图片的范围

  this.init(); // 初始化
}

// 组件初始化
DragZoom.prototype.init = function () {
  if (this._ele) {
    this._canvas = document.createElement("canvas");
    this._ctx = this._canvas.getContext("2d");
    this._ele.appendChild(this._canvas);
    this.setSize(this._ele.clientWidth, this._ele.clientHeight);
    // this._image = 
    this._image.src = this._img;
    this._image.onload = () => {
      const { width: iw, height: ih } = this._image;
      const { width: ew, height: eh } = this._canvas;
      // const { width, height, x, y } = this.calculateDrawSize(iw, ih, ew, eh);
      // this._lastCenter = this.setImagePoint(iw / 2, ih / 2, ew / 2, ew / 2, this._scale);
      // this._ctx.drawImage(this._image, x, y, width, height);
      this._lastCenter = this.setImagePoint(iw / 2, ih / 2, ew / 2, eh / 2, this._scale);
      this.drawImageHandle({ x: iw / 2, y: ih / 2 });
      this._bbox = this._canvas.getBoundingClientRect();
      const self = this;
      // 监听事件
      this._canvas.addEventListener("mousewheel", (e) => self.imageZoom(e));
      this._canvas.addEventListener("mousedown", (e) => {
        self._isMoving = true;
        const { left, top } = self._bbox;
        self._lastPoint = {
          clientX: e.clientX - left,
          clientY: e.clientY - top,
        };
      });
      this._canvas.addEventListener("mouseup", () => {
        self._isMoving = false;
      });
      this._canvas.addEventListener("mouseout", () => {
        self._isOutFlag = true;
        self._isMoving = false;
      });
      this._canvas.addEventListener("mouseover", () => self._isOutFlag = false);
      this._canvas.addEventListener("mousemove", (e) => self.mousemoveHandle(e))
    }
  }
}

// 鼠标移动的事件
DragZoom.prototype.mousemoveHandle = function(e) {
  if (!this._isOutFlag && this._isMoving && this.isPicturalInside(e)) {
    e.preventDefault();
    const { left, top } = this._bbox;
    const { clientX, clientY } = this._lastPoint;
    const center = {
      x: e.clientX - left,
      y: e.clientY - top,
    };
    const offset = {
      offsetX: center.x - clientX,
      offsetY: center.y - clientY,
    };
    this._lastPoint = {
      clientX: e.clientX - left,
      clientY: e.clientY - top,
    };
    this.drawImageHandle(center, offset);
  }
  // if (!this.isPicturalInside(e)) {
  //   this._isMoving = false;
  // }
}

// 判断鼠标是否在图片内部
DragZoom.prototype.isPicturalInside = function(e) {
  const { left, top } = this._bbox;
  const ex = e.clientX - left;
  const ey = e.clientY - top;
  const { x, y, width, height } = this._imageDrawArea;
  if (ex > x && ex < width && ey > y && ey < height) {
    return true;
  }
  return false;
}

 // 图片缩放函数
DragZoom.prototype.imageZoom = function (e) {
  if (this.isPicturalInside(e)) {
    e.preventDefault();
    if (e && e.deltaY && e.deltaY > 0 && this._scale < this._maxScale) {
      this._scale += 0.1;
    } else if (e && e.deltaY && e.deltaY < 0 && this._scale > this._minScale) {
      this._scale -= 0.1;
    }
    const { left, top } = this._bbox;
    const center = {
      x: e.clientX - left,
      y: e.clientY - top
    };
    this.drawImageHandle(center);
  }
}

// 绘制图片的函数
DragZoom.prototype.drawImageHandle = function(center, offset = {}) {
  const curCenter = this.calculateSourcePoint(this._lastCenter, center, offset);
  this._lastCenter = this.setImagePoint(curCenter.x, curCenter.y, center.x, center.y, this._scale);
  this.drawScaleImage(this._canvas, this._scale, this._image, curCenter, center);
}

// 初始化时计算绘制的实际大小
DragZoom.prototype.calculateDrawSize = function(imageWidth, imageHeight, canvasWidth, canvasHeight) {
  if (canvasHeight >= imageHeight * (canvasWidth / imageWidth)) { //按照宽度放大
    const height = imageHeight * (canvasWidth / imageWidth)
    return { width: canvasWidth, height, x: 0 , y: (canvasHeight - height) / 2 };
  } else {
    const width = imageWidth * (canvasHeight / imageHeight);
    return { width, height: canvasHeight, x: (canvasWidth - width) / 2 , y: 0 };
  }
}

// 设置canvas大小
DragZoom.prototype.setSize = function(width, height) {
  this._canvas.width = width;
  this._canvas.height = height;
}

// 设置上次图片的原始中心位置和对应关系
DragZoom.prototype.setImagePoint = function(sx, sy, dx, dy, lastScale) {
  return {
    sx, sy, dx, dy, lastScale,
  };
}

 // 绘制图片，center即为原始图像上的坐标
 DragZoom.prototype.drawScaleImage = function (canvas, scale, image, sCenter, dCenter) {
  const { width: iw, height: ih } = image;
  const { width: ew, height: eh } = canvas;
  const { x, y } = sCenter;
  const { x: dx, y: dy } = dCenter;
  const sx = dx - x * scale;
  const sy = dy - y * scale;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, ew, eh);
  this._imageDrawArea = {
    x: sx, y: sy, width: iw * scale, height: ih * scale,
  };
  ctx.drawImage(image, 0, 0, iw, ih, sx, sy, iw * scale, ih * scale);
}

// 计算当前点在原始图片中的位置
DragZoom.prototype.calculateSourcePoint =  function (lastCenter, center, offset) {
  const { sx, sy, dx, dy, lastScale } = lastCenter;
  const { x, y } = center;
  const { offsetX = 0, offsetY = 0 } = offset;
  const imageX = sx - ((dx - x) / lastScale) - offsetX;
  const imageY = sy - ((dy - y) / lastScale) - offsetY;
  return { x: imageX, y: imageY };
}

// 重置大小时的回调
DragZoom.prototype.resize = function (resiezFun) {
  if (this._adaptive && this._size && resiezFun) {
    resiezFun(this._size);
  }
}

