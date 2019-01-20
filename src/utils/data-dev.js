import { parse } from './utils'

/* eslint-disable no-undef */
// the localstorage implementation for local development
const getRecipe = id => {
  return new Promise(async (resolve, reject) => {
    const recipes = await getRecipes()
    const recipe = recipes.find(r => r.id === id)
    resolve(recipe)
  })
}

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
    if (recipe.image && recipe.image.name) {
      recipe.image = await parse(recipe.image)
    }
    const recipes = await getRecipes()
    recipes.forEach((r, i) => {
      if (r.id === recipe.id) {
        recipes[i] = recipe
      }
    })
    localStorage.setItem('recipes', JSON.stringify(recipes))
    resolve()
  })

const createRecipe = async recipe => {
  const recipes = await getRecipes()
  const id =
    '_' +
    Math.random()
      .toString(36)
      .substr(2, 9)
  return new Promise(async (resolve, reject) => {
    if (recipe.image && recipe.image.name) await parse(recipe.image)
    const items = JSON.stringify(recipes.concat({ id, ...recipe }))
    localStorage.setItem('recipes', items)
    resolve(items)
  })
}

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

const getRecipes = (start = 0, limit = 6) => {
  const recipes = JSON.parse(localStorage.getItem('recipes')).slice(
    start,
    limit
  )
  return new Promise((resolve, reject) => resolve(recipes || []))
}

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
