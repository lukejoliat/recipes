import { router } from './router'
window.addEventListener('load', () => {
  // Highlight Active Menu on Refresh/Page Reload
  const links = document.querySelectorAll(`a[data-path]`)
  links.forEach(link => {
    link.addEventListener('click', event => {
      const path = link.getAttribute('data-path')
      router.onNavItemClick(path)
    })
  })
})
