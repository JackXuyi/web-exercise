require.extensions['.xy'] = function (module, filename) {
  const fs = require('fs')
  const content =
    'xy file say: this file content is ' +
    fs.readFileSync(filename, { encoding: 'utf-8' })

  module.exports = content
}
const reuireModule = require('./export')
const content = require('./test')

console.log('\n', content)
// console.log('\nNativeModule', process.bind('natives'))
console.log('\nrequire function', require)
console.log('\nrequire module object', reuireModule)
console.log('\nmodule object', module)
