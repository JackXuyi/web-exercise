module.exports = 'hello world'

const content = require('./test.xy')

console.log('child module run: \n\n', content)

console.log('\nmodule exports object', module.exports)
