export default class RecipeModel {
  constructor ({ title, ingredients }) {
    this.title = title
    this.ingredients = ingredients
    this.favorite = false
    this.image = null
  }
}

const isValidRecipe = (recipe = {}) => {
  if (recipe.id && recipe.title && recipe.ingredients) return true
}

export { isValidRecipe }
