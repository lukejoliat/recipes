import { router } from '../../router'
import Recipe, { isValidRecipe } from '../../models/Recipe'
import template from './create-recipe.html'
/* global HTMLElement */
export default class CreateRecipe extends HTMLElement {
  constructor () {
    super()
    this._shadowRoot = this.attachShadow({
      mode: 'closed'
    })
  }
  connectedCallback () {
    this._shadowRoot.innerHTML = template
    this._shadowRoot
      .querySelector('.create')
      .addEventListener('click', () => this._create())
    this._shadowRoot
      .querySelector('.cancel')
      .addEventListener('click', () => router.navigateTo('/'))
  }
  _create () {
    const title = this._shadowRoot.querySelector('input').value
    const ingredients = this._shadowRoot.querySelector('textarea').value
    const recipe = new Recipe({ title, ingredients })
    if (isValidRecipe(recipe)) {
      document.dispatchEvent(
        new window.CustomEvent('create', {
          bubbles: false,
          detail: recipe
        })
      )
      router.navigateTo('/')
    }
  }
}

window.customElements.define('create-recipe', CreateRecipe)
