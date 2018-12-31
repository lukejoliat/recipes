const debounce = (func, wait, immediate) => {
  let timeout

  return function executedFunction () {
    const context = this
    const args = arguments

    const later = function () {
      timeout = null
      if (!immediate) func.apply(context, args)
    }

    const callNow = immediate && !timeout

    clearTimeout(timeout)

    timeout = setTimeout(later, wait)

    if (callNow) func.apply(context, args)
  }
}

const filter = (array = [], value) => {
  // TODO: this is pretty ugly
  Array.from(array).map(item => {
    if (item.classList) {
      if (!value) item.classList.remove('hidden')
      else {
        item.title.startsWith(value)
          ? item.classList.remove('hidden')
          : item.classList.add('hidden')
      }
    }
  })
}

const parse = file => {
  return new Promise((resolve, reject) => {
    const reader = new window.FileReader()
    // Wait till complete
    reader.onload = function () {
      resolve(reader.result)
    }
    // Make sure to handle error states
    reader.onerror = function (e) {
      reject(e)
    }
    reader.readAsDataURL(file)
  })
}

const validateFile = file => {}
export { debounce, filter, parse, validateFile }
