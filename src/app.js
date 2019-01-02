import 'babel-polyfill'
import { router } from './router'

window.addEventListener('load', () => {
  // Navigate app to current url
  // router.navigateTo(window.location.pathname)
  // Highlight Active Menu on Refresh/Page Reload
  const links = document.querySelectorAll(`a[data-path]`)
  // link.classList.add('active')
  // const links = document.querySelectorAll('a')
  links.forEach(link => {
    link.addEventListener('click', event => {
      const path = link.getAttribute('data-path')
      router.onNavItemClick(path)
      //     // Block browser page load
      //     event.preventDefault()
      //     // Highlight Active Menu on Click
      const target = event.currentTarget
      document.querySelector('.active').classList.remove('active')
      target.classList.add('active')
    })
  })
})
