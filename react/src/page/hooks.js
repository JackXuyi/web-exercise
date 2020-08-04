import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const useMount = (cb) => {
  useEffect(cb, [])
}

const useUpdate = (cb, deps) => {
  const ref = useRef(0)
  useEffect(() => {
    if (ref.current) {
      cb()
    }
    ref.current = ref.current + 1
  }, deps)
}

const useUnmout = (cb) => {
  useEffect(() => {
    return cb
  }, [])
}

const Hooks = () => {
  const [counter, setCounter] = useState(0)
  useEffect(() => {
    console.log('useEffect')
  }, [])
  useMount(() => {
    console.log('useMount')
  })
  useUpdate(() => {
    console.log('useUpdate')
  })
  useUnmout(() => {
    console.log('useUnmout')
  })
  return (
    <div>
      counter: {counter}
      <br />
      <button onClick={() => setCounter(counter + 1)}>加一</button>
      <br />
      <Link to="/home">home</Link>
    </div>
  )
}

export default Hooks
