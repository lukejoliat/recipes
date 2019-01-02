import 'babel-polyfill'
import './components/error/error'
const DATA_SERVICE =
  process.env.NODE_ENV === 'development'
    ? require('./utils/data-dev')
    : require('./utils/data')
const $el = document.getElementById('app')

const home = async () => {
  await import('./components/recipe/recipe')
  await import('./components/recipe-list/recipe-list')
  await import('./components/modal/modal.js')
  $el.innerHTML = `<recipe-list></recipe-list>`
  $el.querySelector('recipe-list').recipes = await DATA_SERVICE.getRecipes()
}

const create = async () => {
  await import('./components/create-recipe/create-recipe')
  $el.innerHTML = `<create-recipe></create-recipe>`
}

const routes = {
  '/': home,
  '/create': create
}

window.onpopstate = async () => {
  await routes[window.location.pathname]()
}

let onNavItemClick = async pathName => {
  window.history.pushState({}, pathName, window.location.origin + pathName)
  await routes[pathName]()
}

;(async () => {
  await routes[window.location.pathname]()
})()

const router = {
  onNavItemClick,
  routes
}
export { router }
