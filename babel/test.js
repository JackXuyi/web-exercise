const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const type = require('@babel/types')
const generate = require('@babel/generator').default

const code = `
function test(n){
    return n + 1
}
`
const ast = parser.parse(code, { sourceType: 'module' })

traverse(ast, {
  enter(path) {
    console.log('enter', path.node.name)
    if (type.isIdentifier(path.node, { name: 'n' })) {
      path.replaceWith(type.identifier('x'))
    }
  },
  exit(path) {
    console.log('exit', path.node.name)
  },
})

const target = generate(ast)

console.log(target.code)
