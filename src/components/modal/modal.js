/* global HTMLElement */
import template from './modal.html'
import { parse, showError } from '../../utils/utils'
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
    this.$fileInput = null
    this.$recipeTitle = null
    this.$recipeIngredients = null
  }
  connectedCallback () {
    this._shadowRoot.innerHTML = template
    this.$fileInput = this._shadowRoot.querySelector('input[type=file]')
    this._shadowRoot
      .querySelectorAll('.modal-close')
      .forEach(i => i.addEventListener('click', () => this._closeModal()))
    this._shadowRoot
      .querySelector('.action')
      .addEventListener('click', () => this._toggleEditing())
    this.$fileInput.addEventListener('change', async () => this._previewImage())
  }
  _render ({ id, title, ingredients, favorite, image }) {
    if (this._editing) {
      this._shadowRoot.querySelector(
        '.recipe-title'
      ).innerHTML = `<input class="input title" type="text" required  value="${title}"/>`
      this._shadowRoot.querySelector(
        '.recipe-body'
      ).innerHTML = `<textarea class="textarea ingredients" required>${ingredients}</textarea>`
      this._shadowRoot.querySelector('.action').innerHTML = 'Save'
      this._shadowRoot
        .querySelector('.recipe-image-field')
        .classList.remove('hidden')
    } else {
      this._shadowRoot.querySelector('.recipe-title').innerHTML = title
      this._shadowRoot.querySelector('.recipe-body').innerHTML = ingredients
      this._shadowRoot.querySelector('.action').innerHTML = 'Edit'
      this._shadowRoot
        .querySelector('.recipe-image-field')
        .classList.add('hidden')
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
  async _toggleEditing () {
    if (this._editing && this._recipe) {
      this._recipe.title = this._shadowRoot.querySelector('.title').value
      this._recipe.ingredients = this._shadowRoot.querySelector(
        '.ingredients'
      ).value
      if (this._file && this.$fileInput.files[0]) {
        this._recipe.image = this.$fileInput.files[0]
      }
      try {
        if (!isValidRecipe(this._recipe)) {
          throw new Error('Not a valid recipe')
        }
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
    }
    this._editing = !this._editing
    this._render(this._recipe)
  }
  async _previewImage () {
    const image = this.$fileInput.files[0]
    try {
      this._file = await parse(image)
      this._shadowRoot.querySelector('img').src = this._file
    } catch (error) {
      console.error(error)
      showError('Sorry', 'There was an error processing the image.')
      this._closeModal()
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
