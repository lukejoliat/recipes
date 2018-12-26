/* eslint-disable no-undef */
// the localstorage implementation for local development
const getRecipe = id => new Promise((resolve, reject) => getRecipes().find(id))

const getTableResults = () => fetch(`${process.env.API_URL}/postgres-demo`)

const deleteRecipe = id =>
  new Promise(async (resolve, reject) => {
    const recipes = await getRecipes()
    const filteredRecipes = recipes.filter(r => r.id !== id)
    localStorage.setItem('recipes', JSON.stringify(filteredRecipes))
    resolve()
  })

const editRecipe = recipe =>
  new Promise(async (resolve, reject) => {
    const recipes = await getRecipes()
    recipes.forEach((r, i) => {
      if (r.id === recipe.id) {
        recipes[i] = recipe
      }
    })
    localStorage.setItem('recipes', JSON.stringify(recipes))
    resolve()
  })

const createRecipe = (recipes = [], recipe) =>
  new Promise((resolve, reject) => {
    const items = JSON.stringify(recipes.concat(recipe))
    localStorage.setItem('recipes', items)
    resolve()
  })

const favoriteRecipe = id =>
  new Promise(async (resolve, reject) => {
    const recipes = await getRecipes()
    recipes.map(r => {
      if (r.id === id) r.favorite = true
    })
    localStorage.setItem('recipes', JSON.stringify(recipes))
    resolve()
  })

const unFavoriteRecipe = id =>
  new Promise(async (resolve, reject) => {
    const recipes = await getRecipes()
    recipes.map(r => {
      if (r.id === id) r.favorite = false
    })
    localStorage.setItem('recipes', JSON.stringify(recipes))
    resolve()
  })

const getRecipes = () =>
  new Promise((resolve, reject) =>
    resolve(JSON.parse(localStorage.getItem('recipes')) || [])
  )

export {
  deleteRecipe,
  createRecipe,
  getRecipes,
  getRecipe,
  favoriteRecipe,
  unFavoriteRecipe,
  editRecipe,
  getTableResults
}
