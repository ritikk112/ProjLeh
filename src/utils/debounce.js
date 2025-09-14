// src/utils/debounce.js
// Simple debounce utility that returns a debounced function.
// Usage:
//   const debounced = debounce(fn, 300)
//   debounced(arg1, arg2)

export function debounce(fn, wait = 300) {
  let t
  return (...args) => {
    clearTimeout(t)
    t = setTimeout(() => fn(...args), wait)
  }
}
