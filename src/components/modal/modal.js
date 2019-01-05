/* global HTMLElement */
import template from './modal.html'
import { showError } from '../../utils/utils'
import { isValidRecipe } from '../../models/RecipeModel'
const DATA_SERVICE =
  process.env.NODE_ENV === 'development'
    ? require('../../utils/data-dev')
    : require('../../utils/data')
export default class Modal extends HTMLElement {
  constructor () {
    super()
    this._shadowRoot = this.attachShadow({ mode: 'open' })
    this._open = false
    this._recipe = null
    this._editing = false
    this._file = null
    this.$fileUploader = null
    this.$recipeTitle = null
    this.$recipeIngredients = null
  }
  connectedCallback () {
    this._shadowRoot.innerHTML = template
    this._shadowRoot
      .querySelectorAll('.modal-close')
      .forEach(i => i.addEventListener('click', () => this._closeModal()))
    this._shadowRoot
      .querySelector('.edit')
      .addEventListener('click', e => this._edit(e))
  }
  _render ({ id, title, ingredients, favorite, image }) {
    if (this._editing) {
      const form = `
      <form>
        <div class="field">
          <label class="label">Name *</label>
          <input class="input recipe-title" type="text" value="${title}" required />
        </div>
        <div class="field"><file-uploader></file-uploader></div>
        <div class="field">
          <label class="label recipe-ingredients">Ingredients *</label>
          <textarea class="textarea" required>${ingredients}</textarea>
        </div>
        <div class="field is-grouped">
          <div class="control">
            <button class="button is-link create save" type="submit">Submit</button>
          </div>
        </div>
      </form>`
      this._shadowRoot.querySelector('.content').innerHTML = form
      this._shadowRoot
        .querySelector('.save')
        .addEventListener('click', e => this._save(e))
      this.$fileUploader = this._shadowRoot.querySelector('file-uploader')
    } else {
      this._shadowRoot.querySelector('.recipe-title').innerHTML = title
      this._shadowRoot.querySelector(
        '.recipe-ingredients'
      ).innerHTML = ingredients
      if (image) {
        this._shadowRoot.querySelector(
          '.recipe-image'
        ).innerHTML = `<img src="${image}">`
      }
    }
  }
  _openModal () {
    this._open = true
    this._shadowRoot.querySelector('.modal').classList.add('is-active')
  }
  _closeModal () {
    this._editing = false
    this._render(this._recipe)
    this._open = false
    this._shadowRoot.querySelector('.modal').classList.remove('is-active')
  }
  async _edit (e) {
    this._editing = true
    this._render(this._recipe)
  }
  async _save (e) {
    this._recipe.title =
      this._shadowRoot.querySelector('.recipe-title').value || null
    this._recipe.ingredients =
      this._shadowRoot.querySelector('.recipe-ingredients').value || null
    if (this.$fileUploader.file) {
      this._recipe.image = this.$fileUploader.file
    }
    if (isValidRecipe(this._recipe)) {
      e.preventDefault()
      try {
        await DATA_SERVICE.editRecipe(this._recipe)
        document.dispatchEvent(
          new window.CustomEvent('update-recipes', {
            bubbles: true
          })
        )
      } catch (e) {
        showError('Sorry', 'There was an error editing your recipe.')
        console.error(e)
        this._closeModal()
      }
      this._editing = false
    }
  }
  get open () {
    return this._open
  }
  set open (value) {
    value === true ? this._openModal() : this._closeModal()
  }
  get recipe () {
    return this._recipe
  }
  set recipe (recipe) {
    this._recipe = recipe
    this._render(this._recipe)
  }
}

window.customElements.define('recipe-modal', Modal)
