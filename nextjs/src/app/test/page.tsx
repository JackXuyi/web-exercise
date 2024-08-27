'use client'
import { useState, useMemo } from 'react'
import cls from 'classnames';
import './index.css'

export default function Home() {
  const [count, setCount] = useState(0)
  const [operate, setOperate] = useState('')
  const className = useMemo(() => {
    if (operate === 'add') {
      return 'slide-in'
    }
    if (operate === 'minus') {
      return 'slide-out'
    }
    return ''
  }, [operate])

  return (
    <div>
      <div className="w-full h-[40px]">
        <button
          onClick={() => {
            setCount(count + 1)
            setOperate('add')
          }}
        >
          加
        </button>
        <button
          onClick={() => {
            setCount(count - 1)
            setOperate('minus')
          }}
          className='ml-[20px]'
        >
          减
        </button>
      </div>
      <div className={cls('h-[20px] w-screen overflow-hidden')}>
        <div onTransitionEnd={() => setOperate('')} className={cls(className)}>
          {operate === 'add' && <div className='h-[20px] w-screen'>点击次数：{count - 1}</div>}
          <div className='h-[20px] w-screen'>点击次数：{count}</div>
          {operate === 'minus' && <div className='h-[20px] w-screen'>点击次数：{count + 1}</div>}
        </div>
      </div>
      <br />
    </div>
  )
}
