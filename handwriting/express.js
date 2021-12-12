function isMathch(source, match) {
  return source.startsWith(match)
}
const express = {
  middwares: [],
  use: function (path, fun) {
    let handler = fun
    let matchPath = path
    if (typeof fun === 'undefined') {
      matchPath = '/'
      handler = path
    }
    this.middwares.push({ handler, path: matchPath })
  },
  call: function (req, res) {
    const { pathname = '/' } = req
    const middwares = this.middwares.filter((item) =>
      isMathch(pathname, item.path)
    )
    const len = middwares.length
    let index = -1

    function next(err) {
      index++
      if (index < len) {
        middwares[index].handler(req, res, next)
      }
    }

    return next()
  },
}

express.use((req, res, next) => {
  console.log('next1')
  next()
})

express.use('/test', (req, res, next) => {
  console.log('next2')
  next()
})

express.use('/', (req, res, next) => {
  console.log('next3')
})

express.use((req, res, next) => {
  console.log('next4') // 永远也不会执行
})

express.call({}, {})
