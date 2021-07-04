// 按顺序流式调用
class Middware {
  constructor() {
    this.middwares = []
  }

  use = (condition, fun) => {
    let handler = fun
    let cond = condition
    if (typeof fun === 'undefined') {
      handler = condition
      cond = () => true
    }
    this.middwares.push({ handler, cond })
  }

  call = (req) => {
    const middwares = this.middwares.slice()
    let index = 0

    console.log('middwares', middwares)

    function next(error) {
      if (index >= middwares.length) {
        return
      }
      try {
        let cond
        let handler
        do {
          const mid = middwares[index] || {}
          cond = mid.cond || cond
          handler = mid.handler || handler
          index++
        } while (index < middwares.length && !cond(req))
        if (handler) {
          if (!error) {
            handler(req, next)
          } else {
            handler(error, req, next)
          }
        }
      } catch (e) {
        next(e)
      }
    }

    return next()
  }
}

const mid = new Middware()

mid.use(function (req, next) {
  console.log('first req', req)
  next()
})

mid.use(
  (req) => req === 1,
  function (req, next) {
    console.log('second req condition is true', req)
    next()
  },
)

mid.use(function (req, next) {
  console.log('third req', req)
  next(new Error('test error'))
})

mid.use(function (error, req, next) {
  console.log('catch error', error)
  next()
})

mid.use(
  (req) => req === 2,
  function (req) {
    console.log('req handle stop here', req)
  },
)

mid.use(function (error) {
  console.log('final catch error', error)
})

mid.call(1)
console.log('======>>>>>>>>')
mid.call(2)

// 洋葱模式从内而外调用
function componse() {
  const list = Array.from(arguments)
  return async function (req) {
    const value = await list.reduceRight(async (prev, fun) => {
      const value = await prev
      const result = await fun(value)
      return result
    }, Promise.resolve(req))
    return value
  }
}

console.log('======>>>>>>>>')
componse(
  (req) => {
    console.log('first req', req - 1)
    return req
  },
  (req) => {
    console.log('second req', req - 1)
    return req - 1
  },
  (req) => {
    console.log('third req', req - 1)
    return req - 1
  },
)(3)
