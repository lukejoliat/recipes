export default class RecipeModel {
  constructor ({ title, ingredients }) {
    this.id =
      '_' +
      Math.random()
        .toString(36)
        .substr(2, 9)
    this.title = title
    this.ingredients = ingredients
    this.favorite = false
    this.image = null
  }
}

const isValidRecipe = (recipe = {}) => {
  if (recipe.id && recipe.title && recipe.ingredients) {
    return true
  } else return false
}

export { isValidRecipe }
