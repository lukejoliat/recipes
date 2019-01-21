/* global HTMLElement */
import template from './recipe.html'
import { showError } from '../../utils/utils'
import { router } from '../../router'
import DATA_SERVICE from '../../utils/data'
export default class Recipe extends HTMLElement {
  constructor () {
    super()
    this._shadowRoot = this.attachShadow({ mode: 'open' })
    this._recipe = null
  }
  connectedCallback () {
    this.ds = new DATA_SERVICE()
    this._shadowRoot.innerHTML = template
    this._shadowRoot
      .querySelector('.delete-recipe')
      .addEventListener('click', () => this._delete())
    this._shadowRoot
      .querySelector('.edit-recipe')
      .addEventListener('click', () =>
        router.onNavItemClick(`/edit?id=${this._recipe.id}`)
      )
    this._shadowRoot
      .querySelector('.favorite-recipe')
      .addEventListener('click', () => this._toggleFavorite())
  }
  _render (title, ingredients, image) {
    this._shadowRoot.querySelector('.recipe-title').innerHTML = title
    this._shadowRoot.querySelector(
      '.recipe-ingredients'
    ).innerHTML = ingredients
    if (image) this._shadowRoot.querySelector('.recipe-image').src = image
    this._shadowRoot.querySelector('.favorite-recipe').innerHTML = this._recipe
      .favorite
      ? 'Unfavorite'
      : 'Favorite'
  }
  async _delete () {
    if (!this._recipe) return
    try {
      await this.ds.deleteRecipe(this._recipe.id)
      document.dispatchEvent(
        new window.CustomEvent('delete-recipe', {
          bubbles: false,
          detail: {
            id: this._recipe.id
          }
        })
      )
    } catch (e) {
      console.error(e)
      showError(
        'Sorry,',
        'There was a problem deleting the recipe. Please, try again.'
      )
    }
  }
  async _toggleFavorite () {
    try {
      this._recipe.favorite
        ? await this.ds.unFavoriteRecipe(this._recipe.id)
        : await this.ds.favoriteRecipe(this._recipe.id)
    } catch (e) {
      console.error(e)
      showError(
        'Sorry,',
        'There was a problem completing your request. Please, try again.'
      )
    }
    this._recipe.favorite = !this._recipe.favorite
    this._recipe.favorite
      ? (this._shadowRoot.querySelector('.favorite-recipe').textContent =
          'Unfavorite')
      : (this._shadowRoot.querySelector('.favorite-recipe').textContent =
          'Favorite')
  }
  get recipe () {
    return this._recipe
  }
  set recipe (recipe = {}) {
    this._recipe = recipe
    this._render(
      this._recipe.title,
      this._recipe.ingredients,
      this._recipe.image
    )
  }
  set favorite (value) {
    value === true
      ? (this._shadowRoot.querySelector('.favorite-recipe').textContent =
          'Unfavorite')
      : (this._shadowRoot.querySelector('.favorite-recipe').textContent =
          'Favorite')
  }
}

window.customElements.define('recipe-item', Recipe)
