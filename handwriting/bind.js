Function.prototype.bond = function (thisArg, fun, ...preArgs) {
  function Fun() {}
  if (this.prototype) {
    Fun.prototype = this.prototype
  }
  function bound() {
    const otherArgs = Array.prototype.slice.call(arguments, 0)
    const that = this instanceof Fun ? this : thisArg || this
    return fun.call(that, ...preArgs, ...otherArgs)
  }
  // 确保实例化的对象原型中包含 Fun
  bound.prototype = new Fun()
  return bound
}

function test() {
  this.a = 'test'
  console.log('this', this)
  console.log('arguments', Array.prototype.slice.call(arguments, 0))
}

const bindFun = Function.prototype.bond({ test: 'hello world' }, test, 'hello')

bindFun('world')
console.log()
new bindFun('world')
