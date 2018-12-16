import {
  deleteRecipe,
  createRecipe,
  getRecipes,
  favoriteRecipe,
  unFavoriteRecipe,
  editRecipe
} from './utils/data'

const registerGlobalEvents = $el => {
  document.addEventListener('delete', async e => {
    await deleteRecipe(e.detail).catch(res =>
      window.alert('Could not perform this action.')
    )
    $el.querySelector('recipe-list').recipes = await getRecipes()
  })
  document.addEventListener('togglefavorite', async event => {
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
  })
  document.addEventListener('edit', async event => {
    if (event.detail && event.detail.id) {
      await editRecipe(event.detail).catch(res =>
        window.alert('Could not perform this action.')
      )
      $el.querySelector('recipe-list').recipes = await getRecipes()
    }
  })
  document.addEventListener('create', async event => {
    const recipes = await getRecipes()
    const $recipeList = $el.querySelector('recipe-list')
    await createRecipe(recipes, event.detail).catch(res =>
      window.alert('Could not perform this action.')
    )
    if ($recipeList) $recipeList.recipes = await getRecipes()
  })
}

const unregisterGlobalEvents = $el => {
  // document.removeEventListener('delete', async event => {
  //   await deleteRecipe(event.detail).catch(res =>
  //     window.alert('Could not perform this action.')
  //   )
  //   $el.querySelector('recipe-list').recipes = await getRecipes()
  // })
  // document.removeEventListener('togglefavorite', async event => {
  //   if (event.detail && event.detail.id) {
  //     event.detail.favorite
  //       ? await unFavoriteRecipe(event.detail.id).catch(res =>
  //         window.alert('Could not perform this action.')
  //       )
  //       : await favoriteRecipe(event.detail.id).catch(res =>
  //         window.alert('Could not perform this action.')
  //       )
  //     $el.querySelector('recipe-list').recipes = await getRecipes()
  //   }
  // })
  // document.removeEventListener('edit', async event => {
  //   if (event.detail && event.detail.id) {
  //     await editRecipe(event.detail).catch(res =>
  //       window.alert('Could not perform this action.')
  //     )
  //     $el.querySelector('recipe-list').recipes = await getRecipes()
  //   }
  // })
  // document.removeEventListener('create', async event => {
  //   const recipes = await getRecipes()
  //   const $recipeList = $el.querySelector('recipe-list')
  //   await createRecipe(recipes, event.detail).catch(res =>
  //     window.alert('Could not perform this action.')
  //   )
  //   if ($recipeList) $recipeList.recipes = await getRecipes()
  // })
}

export { registerGlobalEvents, unregisterGlobalEvents }
