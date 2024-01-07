/**
 * @author xuyi
 */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import faceapi from 'face-api.js'

class home extends Component {
  constructor(props, contenxt) {
    console.log('contenxt', contenxt)
    super(props)
    this.state = {
      count: 0,
    }
  }

  componentDidMount() {
    console.log('componentDidMount')
  }

  async loadModel() {
    // await faceapi.nets.ssdMobilenetv1.load('./face-api.js/weights');
    await faceapi.nets.tinyFaceDetector.load('./weights/tiny')
    await faceapi.loadFaceLandmarkModel('./weights/face_landmark')
  }

  async getFace() {
    const detections = await faceapi.detectAllFaces('image')
    // const detections = await faceapi.detectAllFaces(input, new faceapi.SsdMobilenetv1Options());
    // const detections = await faceapi.detectAllFaces(input, new faceapi.TinyFaceDetectorOptions());
  }

  render() {
    console.log('render', count)
    const { count } = this.state
    return (
      <div>
        <img id="image" src="img.png" />
        <video id="video" src="video.mp4" />
        <canvas id="canvas" />
      </div>
    )
  }
}

export default home
