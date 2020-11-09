import React, { useEffect, useState } from 'react'

import styles from './comp.scss'

function test() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    setCount(count + 1)
  }, [])
  return <div className={styles.layout}>{count}</div>
}

export default test
