/**
 * @author xuyi
 */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
  Scene,
  BoxGeometry,
  MeshLambertMaterial,
  Mesh,
  PerspectiveCamera,
  WebGLRenderer,
  AxesHelper,
  PointLight,
  PointLightHelper,
} from 'three'
// 引入轨道控制器扩展库OrbitControls.js
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

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
    const material = new MeshLambertMaterial({
      color: 0x0000ff, //设置材质颜色
      transparent: true, //开启透明
      opacity: 0.5, //设置透明度
    })
    // 两个参数分别为几何体geometry、材质material
    const mesh = new Mesh(geometry, material) //网格模型对象Mesh
    // 设置网格模型在三维空间中的位置坐标，默认是坐标原点
    mesh.position.set(0, 10, 0)
    scene.add(mesh)

    // AxesHelper：辅助观察的坐标系
    const axesHelper = new AxesHelper(150)
    scene.add(axesHelper)

    //点光源：两个参数分别表示光源颜色和光照强度
    // 参数1：0xffffff是纯白光,表示光源颜色
    // 参数2：1.0,表示光照强度，可以根据需要调整
    const pointLight = new PointLight(0xffffff, 1.0)
    let intensity = 100000
    let count = 1
    pointLight.intensity = intensity //光照强度
    scene.add(pointLight) //点光源添加到场景中
    pointLight.position.set(40, 200, 300)

    // 光源辅助观察
    const pointLightHelper = new PointLightHelper(pointLight, 10)
    scene.add(pointLightHelper)

    setInterval(() => {
      count++
      intensity = intensity * 10
      pointLight.intensity = intensity
      console.log('intensity', intensity)
      pointLight.position.set(count * 40, 200, 300)
      // scene.add(pointLight) //点光源添加到场景中
      renderer.render(scene, camera) //执行渲染操作
    }, 1000)

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

    // // 设置相机控件轨道控制器OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement)
    // 如果OrbitControls改变了相机参数，重新调用渲染器渲染三维场景
    controls.addEventListener('change', function () {
      renderer.render(scene, camera) //执行渲染操作
    }) //监听鼠标、键盘事件

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
