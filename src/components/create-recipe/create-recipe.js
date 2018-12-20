import { router } from '../../router'
import Recipe, { isValidRecipe } from '../../models/Recipe'

/* global HTMLElement */
export default class CreateRecipe extends HTMLElement {
  constructor () {
    super()
    this._shadowRoot = this.attachShadow({
      mode: 'closed'
    })
  }
  connectedCallback () {
    this._shadowRoot.innerHTML = `
    <head><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.2/css/bulma.min.css">
    <form action="#">
      <div class="field">
        <label class="label">Name *</label>
        <input class="input" type="text" required />
      </div>
      <div class="field">
        <label class="label">Ingredients *</label>
        <textarea class="textarea" required></textarea>
      </div>
      <div class="field is-grouped">
        <div class="control"><button class="button is-link create" type="submit">Submit</button></div>
        <div class="control"><button class="button is-text cancel">Cancel</button></div>
      </div>
    </form>`
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
