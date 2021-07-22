function proxyFanctory(obj) {
  const target = new Proxy(obj, {
    get(target, p) {
      if (p === Symbol.unscopables) {
        return undefined
      }
      if (target[p] === undefined) {
        return undefined
      }
      return target[p]
    },
    set(target, p, value) {
      target[p] = value
    },
  })

  return target
}

function formatCodeToString(code) {
  const type = typeof code
  if (type === 'function') {
    return Function.prototype.toString.call(code)
  } else if (type === 'object') {
    return JSON.stringify(code)
  }
  return code
}

function runWithSanbox(code) {
  const codeStr = formatCodeToString(code)
  const context = proxyFanctory({ a: 'test' })
  const codeSrc = `with(sandbox){${codeStr}}`
  return new Function('sandbox', codeSrc).call(context, context)
}

runWithSanbox('console.log(a, this)')
