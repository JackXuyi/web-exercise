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
