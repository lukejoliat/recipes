import Router from 'vanilla-router'
import error from './components/error'
import { getRecipes } from './utils/data'
import { registerGlobalEvents } from './events'

const $el = document.getElementById('app')
registerGlobalEvents($el)

// Router Declaration
const router = new Router({
  mode: 'history',
  page404: path => {
    const html = error(
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
    $el.innerHTML = `<recipe-list></recipe-list>`
    $el.querySelector('recipe-list').recipes = await getRecipes()
  })
  router.add('/create', () => {
    $el.innerHTML = `<create-recipe></create-recipe>`
  })
})

export { router }
