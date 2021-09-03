export function debounce (fn, delay) {
  delay = delay || 100
  let timer
  return function () {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, arguments)
    }, delay)
  }
}
