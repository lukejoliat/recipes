import 'babel-polyfill'
import Router from 'vanilla-router'
import { getRecipes } from './utils/data'
const $el = document.getElementById('app')

// Router Declaration
const router = new Router({
  mode: 'history',
  page404: async path => {
    const errorTemplate = await import('./components/error')
    const html = errorTemplate.default(
      'yellow',
      'Error 404 - Page NOT Found!',
      `The path '/${path}' does not exist on this site`
    )
    $el.innerHTML = html
  }
})

// Routes
window.addEventListener('load', () => {
  router.add('/', async () => {
    await import('./components/recipe/recipe')
    await import('./components/recipe-list/recipe-list')
    await import('./components/modal/modal.js')
    $el.innerHTML = `<recipe-list></recipe-list>`
    $el.querySelector('recipe-list').recipes = await getRecipes()
  })
  router.add('/create', async () => {
    await import('./components/create-recipe/create-recipe')
    $el.innerHTML = `<create-recipe></create-recipe>`
  })
})

export { router }
