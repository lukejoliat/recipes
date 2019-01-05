import 'babel-polyfill'
import './components/error/error'
import './components/file-uploader/file-uploader'
import content404 from './components/404/404.html'
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

const edit = async () => {
  await import('./components/edit-recipe/edit-recipe')
  $el.innerHTML = `<edit-recipe></edit-recipe>`
}

const error404 = async () => {
  $el.innerHTML = content404
}

const routes = {
  '/': home,
  '/create': create,
  '/error': error404,
  '/edit': async function (params) {
    const id = params.get('id')
    const recipe = await DATA_SERVICE.getRecipe(id)
    await edit()
    $el.querySelector('edit-recipe').recipe = recipe
  }
}

window.onpopstate = async () => {
  if (routes[window.location.pathname]) await routes[window.location.pathname]()
  else routes['/error']()
}

let onNavItemClick = async pathName => {
  const url = new URL(pathName, window.location.origin)
  const params = url.searchParams
  if (routes[url.pathname]) {
    window.history.pushState({}, pathName, window.location.origin + pathName)
    await routes[url.pathname](params)
  } else {
    window.history.pushState({}, '404', window.location.origin + '/404')
    routes['/error']()
  }
}

;(async () => {
  const url = new URL(
    window.location.pathname + window.location.search,
    window.location.origin
  )
  if (routes[window.location.pathname]) { await routes[window.location.pathname](url.searchParams) } else routes['/error']()
})()

const router = {
  onNavItemClick,
  routes
}
export { router }
