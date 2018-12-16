/* global HTMLElement */
export default class Modal extends HTMLElement {
  constructor () {
    super()
    this._shadowRoot = this.attachShadow({ mode: 'open' })
    this._open = false
    this._recipe = null
    this._editing = false
  }
  connectedCallback () {
    this._shadowRoot.innerHTML = `
    <head>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.2/css/bulma.min.css">
    </head>
    <div class="modal">
      <div class="modal-background"></div>
        <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title"></p>
          <button class="delete close" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <h2></h2>
          <p></p>
        </section>
        <footer class="modal-card-foot">
          <button class="button action is-success"></button>
        </footer>
      </div>
    </div>`
    this._shadowRoot
      .querySelectorAll('.close')
      .forEach(i => i.addEventListener('click', () => this._closeModal()))
    this._shadowRoot
      .querySelector('.action')
      .addEventListener('click', () => this._toggleEditing())
  }
  detachedCallback () {
    this._shadowRoot
      .querySelectorAll('.close')
      .forEach(i => i.removeEventListener('click', () => this._closeModal()))
    this._shadowRoot
      .querySelector('.action')
      .removeEventListener('click', () => this._toggleEditing())
  }
  _render ({ id, title, ingredients, favorite }) {
    if (this._editing) {
      this._shadowRoot.querySelector(
        '.modal-card-body h2'
      ).innerHTML = `<input class="input title" type="text" required  value="${title}"/>`
      this._shadowRoot.querySelector(
        '.modal-card-body p'
      ).innerHTML = `<textarea class="textarea ingredients" required>${ingredients}</textarea>`
      this._shadowRoot.querySelector('.action').innerHTML = 'Save'
    } else {
      this._shadowRoot.querySelector('.modal-card-body h2').innerHTML = title
      this._shadowRoot.querySelector(
        '.modal-card-body p'
      ).innerHTML = ingredients
      this._shadowRoot.querySelector('.action').innerHTML = 'Edit'
    }
  }
  _openModal () {
    this._open = true
    this._shadowRoot.querySelector('.modal').classList.add('is-active')
  }
  _closeModal () {
    this._open = false
    this._shadowRoot.querySelector('.modal').classList.remove('is-active')
  }
  _toggleEditing () {
    if (this._editing && this._recipe) {
      this._recipe.title = this._shadowRoot.querySelector('.title').value
      this._recipe.ingredients = this._shadowRoot.querySelector(
        '.ingredients'
      ).value
      document.dispatchEvent(
        new window.CustomEvent('edit', {
          bubbles: true,
          detail: this._recipe
        })
      )
    }
    this._editing = !this._editing
    this._render(this._recipe)
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
