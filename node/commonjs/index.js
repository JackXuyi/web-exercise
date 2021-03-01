require.extensions['.xuyi'] = function (module, filename) {
  const fs = require('fs')
  const content =
    'xuyi say: this file content is ' +
    fs.readFileSync(filename, { encoding: 'utf-8' })

  module.exports = content
}
const reuireModule = require('./export')
const content = require('./test.xuyi')

console.log('\n', content)
console.log('\nrequire function', require)
console.log('\nrequire module object', reuireModule)
console.log('\nmodule object', module)
console.log('\nmodule exports object', module.exports)
