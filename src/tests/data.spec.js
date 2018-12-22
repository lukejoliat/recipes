/* eslint-disable no-undef */
import {
  getRecipes,
  createRecipe,
  editRecipe,
  favoriteRecipe,
  unFavoriteRecipe
} from '../utils/data'
import RecipeModel from '../models/Recipe'

it('getRecipes return an empty array if there are no recipes', async () => {
  const recipes = await getRecipes()
  expect(recipes.length).toEqual(0)
})

it('createRecipe adds an item to the array of recipes', async () => {
  await createRecipe(await getRecipes(), new RecipeModel('test', 'ingredients'))
  const recipes = await getRecipes()
  expect(recipes.length).toEqual(1)
})

it('editRecipe changes the content of a recipe', async () => {
  let recipes = await getRecipes()
  const recipe = recipes[0]
  recipe.title = 'test2'
  await editRecipe(recipe)
  recipes = await getRecipes()
  expect(recipes[0].title).toEqual('test2')
})

it('favoriteRecipe marks a recipe as favorite', async () => {
  let recipes = await getRecipes()
  const recipe = recipes[0]
  await favoriteRecipe(recipe.id)
  recipes = await getRecipes()
  expect(recipes[0].favorite).toBeTruthy()
})

it('unFavoriteRecipe marks a recipe as not favorite', async () => {
  let recipes = await getRecipes()
  const recipe = recipes[0]
  await unFavoriteRecipe(recipe.id)
  recipes = await getRecipes()
  expect(recipes[0].favorite).toBeFalsy()
})
