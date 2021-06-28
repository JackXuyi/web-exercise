function add(...prevArgs) {
  let args = [...prevArgs]
  function addFun(...currArgs) {
    args = [...args, ...currArgs]
    return addFun
  }
  addFun.valueOf = addFun.toString = function () {
    return args.reduce((prev, curr) => prev + curr, 0)
  }

  return addFun
}

console.log(add(1)(2)(3) == 6)
console.log(add(1, 2)(3) == 6)
console.log(add(1, 2, 3) == 6)
console.log(add(1, 2, 3).toString())

function currFun(len) {
  let args = []
  return function runFun(...currArgs) {
    args = [...args, ...currArgs]
    if (args.length < len) {
      return runFun
    } else {
      return args.slice(0, len).reduce((prev, curr) => prev + curr, 0)
    }
  }
}

const addFun = currFun(3)
console.log(addFun(1, 2, 3) === 6)

class Functor {
  constructor(value) {
    this.value = value
  }

  static of(value) {
    return new Functor(value)
  }

  apply(fun) {
    return Functor.of(fun(this.value))
  }
}
function addNumber(num) {
  return function (value) {
    return num + value
  }
}
const result = Functor.of(1).apply(addNumber(10)).apply(addNumber(100))
console.log(result.value)
const obj = {
  name: 'nameObj',
}
const argsArr = [1, 2, 3]
function testConsole(...args) {
  console.log('testConsole', ...args, 'name', this.name)
  return args
}
Function.prototype.apply.call(testConsole, obj, [
  ...argsArr,
  ...argsArr,
  'Function.prototype.apply.call',
])
testConsole.apply(obj, [...argsArr, ...argsArr, 'testConsole.apply'])

Function.prototype.call.bind(testConsole, obj, ...argsArr)()
testConsole.bind(obj, ...argsArr)()

Function.prototype.call.call(testConsole, obj, [
  ...argsArr,
  ...argsArr,
  'Function.prototype.call.call',
])
