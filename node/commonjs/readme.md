### commonjs

每个模块都有一个 `Module` 对象代表模块自身

#### `Module` 对象

```ts
interface Module {
  exports: any
  require: Require
  id: string
  filename: string
  loaded: boolean
  /** @deprecated since 14.6.0 Please use `require.main` and `module.children` instead. */
  parent: Module | null | undefined
  children: Module[]
  /**
   * @since 11.14.0
   *
   * The directory name of the module. This is usually the same as the path.dirname() of the module.id.
   */
  path: string
  paths: string[]
}
```

#### `Require` 对象

```ts
interface Require {
  (id: string): any
  resolve: RequireResolve
  cache: Dict<NodeModule>
  /**
   * @deprecated
   */
  extensions: RequireExtensions
  main: Module | undefined
}
```

#### 自定义扩展文件读取

通过扩展 `extensions` 对象来实现自定义文件的读取

```ts
require.extensions['.xy'] = function (module, filename) {
  const fs = require('fs')
  const content =
    'xy file say: this file content is ' +
    fs.readFileSync(filename, { encoding: 'utf-8' })
  module.exports = content
}
```
