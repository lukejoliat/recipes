/* global HTMLElement */
import template from './recipe.html'
import { showError } from '../../utils/utils'
const DATA_SERVICE =
  process.env.NODE_ENV === 'development'
    ? require('../../utils/data-dev')
    : require('../../utils/data')
export default class Recipe extends HTMLElement {
  constructor () {
    super()
    this._shadowRoot = this.attachShadow({ mode: 'open' })
    this._recipe = null
  }
  connectedCallback () {
    this._shadowRoot.innerHTML = template
    this._modal = this._shadowRoot.querySelector('recipe-modal')
    this._shadowRoot
      .querySelector('.delete')
      .addEventListener('click', () => this._delete())
    this._shadowRoot
      .querySelector('.open')
      .addEventListener('click', () => this._toggleModal())
    this._shadowRoot
      .querySelector('.favorite')
      .addEventListener('click', () => this._toggleFavorite())
  }
  _render (title) {
    this._shadowRoot.querySelector('.recipe-title').innerHTML = title
    this._shadowRoot.querySelector('.favorite').innerHTML = this._recipe
      .favorite
      ? 'Unfavorite'
      : 'Favorite'
  }
  _toggleModal () {
    this._modal.open = !this._modal.open
    this._modal.recipe = this._recipe
  }
  async _delete () {
    if (!this._recipe) return
    try {
      await DATA_SERVICE.deleteRecipe(this._recipe.id)
      document.dispatchEvent(
        new window.CustomEvent('update-recipes', {
          bubbles: false
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
    if (!this._recipe) return
    try {
      this._recipe.favorite
        ? await DATA_SERVICE.unFavoriteRecipe(this._recipe.id)
        : await DATA_SERVICE.favoriteRecipe(this._recipe.id)
      document.dispatchEvent(
        new window.CustomEvent('update-recipes', {
          bubbles: false
        })
      )
    } catch (e) {
      console.error(e)
      showError(
        'Sorry,',
        'There was a problem completing your request. Please, try again.'
      )
    }
  }
  get recipe () {
    return this._recipe
  }
  set recipe (recipe = {}) {
    this._recipe = recipe
    this._render(this._recipe.title)
  }
}

window.customElements.define('recipe-item', Recipe)
