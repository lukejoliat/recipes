let DATA_SERVICE
process.env === 'local'
  ? import(`../utils/data-dev`).then(r => (DATA_SERVICE = r))
  : import(`../utils/data`).then(r => (DATA_SERVICE = r))
const $el = document.getElementById('app')

const handleDelete = async e => {
  await DATA_SERVICE.deleteRecipe(e.detail).catch(res =>
    window.alert('Could not perform this action.')
  )
  $el.querySelector('recipe-list').recipes = await DATA_SERVICE.getRecipes()
}

const handleFavorite = async event => {
  if (event.detail && event.detail.id) {
    event.detail.favorite
      ? await DATA_SERVICE.unFavoriteRecipe(event.detail.id).catch(res =>
        window.alert('Could not perform this action.')
      )
      : await DATA_SERVICE.favoriteRecipe(event.detail.id).catch(res =>
        window.alert('Could not perform this action.')
      )
    $el.querySelector('recipe-list').recipes = await DATA_SERVICE.getRecipes()
  }
}

const handleEdit = async event => {
  if (event.detail && event.detail.id) {
    await DATA_SERVICE.editRecipe(event.detail).catch(res =>
      window.alert('Could not perform this action.')
    )
    $el.querySelector('recipe-list').recipes = await DATA_SERVICE.getRecipes()
  }
}

const handleCreate = async event => {
  const recipes = await DATA_SERVICE.getRecipes()
  const $recipeList = $el.querySelector('recipe-list')
  await DATA_SERVICE.createRecipe(recipes, event.detail).catch(res =>
    window.alert('Could not perform this action.')
  )
  if ($recipeList) $recipeList.recipes = await DATA_SERVICE.getRecipes()
}

export { handleDelete, handleFavorite, handleEdit, handleCreate }
