import {
  deleteRecipe,
  unFavoriteRecipe,
  favoriteRecipe,
  getRecipes,
  editRecipe,
  createRecipe
} from '../utils/data'
const $el = document.getElementById('app')

// global events
const handleDelete = async e => {
  await deleteRecipe(e.detail).catch(res =>
    window.alert('Could not perform this action.')
  )
  $el.querySelector('recipe-list').recipes = await getRecipes()
}

const handleFavorite = async event => {
  if (event.detail && event.detail.id) {
    event.detail.favorite
      ? await unFavoriteRecipe(event.detail.id).catch(res =>
        window.alert('Could not perform this action.')
      )
      : await favoriteRecipe(event.detail.id).catch(res =>
        window.alert('Could not perform this action.')
      )
    $el.querySelector('recipe-list').recipes = await getRecipes()
  }
}

const handleEdit = async event => {
  if (event.detail && event.detail.id) {
    await editRecipe(event.detail).catch(res =>
      window.alert('Could not perform this action.')
    )
    $el.querySelector('recipe-list').recipes = await getRecipes()
  }
}

const handleCreate = async event => {
  const recipes = await getRecipes()
  const $recipeList = $el.querySelector('recipe-list')
  await createRecipe(recipes, event.detail).catch(res =>
    window.alert('Could not perform this action.')
  )
  if ($recipeList) $recipeList.recipes = await getRecipes()
}

export { handleDelete, handleFavorite, handleEdit, handleCreate }
