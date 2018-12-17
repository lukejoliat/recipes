/* eslint-disable no-undef */
import { getRecipes, createRecipe } from '../utils/data'
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
