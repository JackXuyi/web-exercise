//odd.js
import { even } from './a.es6.mjs'

export function odd(n) {
  return n != 0 && even(n - 1)
}
