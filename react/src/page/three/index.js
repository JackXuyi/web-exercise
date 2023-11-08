/**
 * @author xuyi
 */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
  Scene,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  PerspectiveCamera,
  WebGLRenderer,
} from 'three'

class home extends Component {
  constructor(props, contenxt) {
    console.log('contenxt', contenxt)
    super(props)
    this.state = {
      count: 0,
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('getDerivedStateFromProps', nextProps, prevState)
    return null
  }

  componentDidMount() {
    this.init()
    console.log('componentDidMount')
  }

  init() {
    // 创建3D场景对象Scene
    const scene = new Scene()
    //创建一个长方体几何对象Geometry
    const geometry = new BoxGeometry(100, 100, 100)
    //创建一个材质对象Material
    const material = new MeshBasicMaterial({
      color: 0xff0000, //0xff0000设置材质颜色为红色
    })
    // 两个参数分别为几何体geometry、材质material
    const mesh = new Mesh(geometry, material) //网格模型对象Mesh
    // 设置网格模型在三维空间中的位置坐标，默认是坐标原点
    mesh.position.set(0, 10, 0)
    scene.add(mesh)
    // 实例化一个透视投影相机对象
    const camera = new PerspectiveCamera()
    // 相机在Three.js三维坐标系中的位置
    // 根据需要设置相机位置具体值
    camera.position.set(200, 200, 200)
    camera.lookAt(mesh.position) //指向mesh对应的位置
    // 创建渲染器对象
    const renderer = new WebGLRenderer()
    // 定义threejs输出画布的尺寸(单位:像素px)
    const width = 800 //宽度
    const height = 500 //高度
    renderer.setSize(width, height) //设置three.js渲染区域的尺寸(像素px)
    renderer.render(scene, camera) //执行渲染操作
    document.getElementById('webgl').appendChild(renderer.domElement)
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('getSnapshotBeforeUpdate', this.state, prevState)
    return null
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate', this.state, prevState)
    return false
  }

  render() {
    console.log('render', count)
    const { count } = this.state
    return (
      <div>
        <button onClick={() => this.setState({ count: count + 1 })}>加</button>
        <span>点击次数：{count}</span>
        <br />
        <Link to="/hooks">hooks</Link>
        <div id="webgl" />
      </div>
    )
  }
}

export default home
