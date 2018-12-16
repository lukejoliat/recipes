import Recipe from '../models/Recipe'

const getRecipe = id => getRecipes().find(id)

const deleteRecipe = id =>
  new Promise(async (resolve, reject) => {
    let recipes = await getRecipes()
    recipes = recipes.filter(r => r.id !== id)
    window.localStorage.setItem('recipes', JSON.stringify(recipes))
    // eslint-disable-next-line prefer-promise-reject-errors
    reject()
  })

const editRecipe = recipe =>
  new Promise(async (resolve, reject) => {
    const recipes = await getRecipes()
    recipes.forEach((r, i) => {
      if (r.id === recipe.id) {
        recipes[i] = recipe
      }
    })
    window.localStorage.setItem('recipes', JSON.stringify(recipes))
    resolve()
  })

const createRecipe = (recipes = [], recipe) =>
  new Promise((resolve, reject) => {
    const items = JSON.stringify([...recipes, new Recipe(recipe)])
    window.localStorage.setItem('recipes', items)
    resolve(recipe)
  })

const favoriteRecipe = id =>
  new Promise(async (resolve, reject) => {
    const recipes = await getRecipes()
    recipes.map(r => {
      if (r.id === id) r.favorite = true
    })
    window.localStorage.setItem('recipes', JSON.stringify(recipes))
    resolve()
  })

const unFavoriteRecipe = id =>
  new Promise(async (resolve, reject) => {
    const recipes = await getRecipes()
    recipes.map(r => {
      if (r.id === id) r.favorite = false
    })
    window.localStorage.setItem('recipes', JSON.stringify(recipes))
    resolve()
  })

const getRecipes = () =>
  new Promise((resolve, reject) =>
    resolve(JSON.parse(window.localStorage.getItem('recipes')) || [])
  )

export {
  deleteRecipe,
  createRecipe,
  getRecipes,
  getRecipe,
  favoriteRecipe,
  unFavoriteRecipe,
  editRecipe
}
