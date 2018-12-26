/* eslint-disable no-undef */
import RecipeModel from '../models/Recipe'
let DATA_SERVICE
process.env === 'local'
  ? import(`../utils/data-dev`).then(r => (DATA_SERVICE = r))
  : import(`../utils/data`).then(r => (DATA_SERVICE = r))

it('DATA_SERVICE.getRecipes return an empty array if there are no recipes', async () => {
  const recipes = await DATA_SERVICE.getRecipes()
  expect(recipes.length).toEqual(0)
})

it('createRecipe adds an item to the array of recipes', async () => {
  await DATA_SERVICE.createRecipe(
    await DATA_SERVICE.getRecipes(),
    new RecipeModel('test', 'ingredients')
  )
  const recipes = await DATA_SERVICE.getRecipes()
  expect(recipes.length).toEqual(1)
})

it('editRecipe changes the content of a recipe', async () => {
  let recipes = await DATA_SERVICE.getRecipes()
  const recipe = recipes[0]
  recipe.title = 'test2'
  await DATA_SERVICE.editRecipe(recipe)
  recipes = await DATA_SERVICE.getRecipes()
  expect(recipes[0].title).toEqual('test2')
})

it('favoriteRecipe marks a recipe as favorite', async () => {
  let recipes = await DATA_SERVICE.getRecipes()
  const recipe = recipes[0]
  await DATA_SERVICE.favoriteRecipe(recipe.id)
  recipes = await DATA_SERVICE.getRecipes()
  expect(recipes[0].favorite).toBeTruthy()
})

it('unFavoriteRecipe marks a recipe as not favorite', async () => {
  let recipes = await DATA_SERVICE.getRecipes()
  const recipe = recipes[0]
  await DATA_SERVICE.unFavoriteRecipe(recipe.id)
  recipes = await DATA_SERVICE.getRecipes()
  expect(recipes[0].favorite).toBeFalsy()
})
