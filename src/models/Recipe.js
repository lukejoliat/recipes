export default class Recipe {
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
