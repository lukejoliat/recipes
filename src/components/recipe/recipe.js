/* global HTMLElement */
import template from './recipe.html'
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
  _delete () {
    if (!this._recipe) return
    document.dispatchEvent(
      new window.CustomEvent('delete', {
        bubbles: false,
        detail: this._recipe.id
      })
    )
  }
  _toggleFavorite () {
    if (!this._recipe) return
    document.dispatchEvent(
      new window.CustomEvent('togglefavorite', {
        bubbles: false,
        detail: { id: this._recipe.id, favorite: this._recipe.favorite }
      })
    )
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
