/* global HTMLElement */
import { router } from '../../router'
import template from './edit-recipe.html'
import { showError } from '../../utils/utils'
import { isValidRecipe } from '../../models/RecipeModel'
import DATA_SERVICE from '../../utils/data'

export default class EditRecipe extends HTMLElement {
  constructor () {
    super()
    this._shadowRoot = this
    // this.attachShadow({
    //   mode: 'open'
    // })
    this._recipe = null
    this.$fileUploader = null
    this.$title = null
    this.$ingredients = null
    this.ds = new DATA_SERVICE()
  }
  connectedCallback () {
    this._shadowRoot.innerHTML = template
    this.$fileUploader = this._shadowRoot.querySelector('file-uploader')
    this.$title = this._shadowRoot.querySelector('.recipe-title')
    this.$ingredients = this._shadowRoot.querySelector('.recipe-ingredients')
    this._shadowRoot
      .querySelector('.edit')
      .addEventListener('click', e => this._edit(e))
    this._shadowRoot
      .querySelector('.cancel')
      .addEventListener('click', () => router.onNavItemClick('/'))
  }
  async _edit (e) {
    const title = this.$title.value || null
    const ingredients = this.$ingredients.value || null
    const image = this.$fileUploader.file || null
    const { id } = this._recipe
    const recipe = { id, title, ingredients, image }
    if (isValidRecipe(recipe)) {
      e.preventDefault()
      try {
        await this.ds.editRecipe(recipe)
        router.onNavItemClick('/')
      } catch (e) {
        console.error(e)
        showError(
          'Sorry',
          'There was an error creating your recipe, please try again.'
        )
      }
    }
  }
  get recipe () {
    return this._recipe
  }
  set recipe (recipe) {
    this._recipe = recipe
    if (!this._recipe) {
      this._shadowRoot.innerText =
        '<strong>Sorry, the recipe could not be found.</strong>'
      return
    }
    if (this.$title && this._recipe.title) {
      this.$title.value = this._recipe.title
    }
    if (this.$ingredients && this._recipe.ingredients) {
      this.$ingredients.value = this._recipe.ingredients
    }
    if (this.$fileUploader && this._recipe.image) {
      this.$fileUploader.file = this._recipe.image
    }
  }
}

window.customElements.define('edit-recipe', EditRecipe)
