export default class Modal extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._open = false;
    this._recipe = null;
    this._editing = false;
  }
  connectedCallback() {
    this._shadowRoot.innerHTML = `
    <head>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.2/css/bulma.min.css">
    </head>
    <div class="modal">
      <div class="modal-background"></div>
        <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Modal title</p>
          <button class="delete close" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <h2></h2>
          <p></p>
        </section>
        <footer class="modal-card-foot">
          <button class="button">Edit</button>
          <button class="button close">Close</button>
        </footer>
      </div>
    </div>`;
    this._shadowRoot
      .querySelectorAll('.close')
      .forEach(i => i.addEventListener('click', () => this._closeModal()));
  }
  _render({ id, title, ingredients, favorite }) {
    this._shadowRoot.querySelector('.modal-card-body h2').innerHTML = title;
    this._shadowRoot.querySelector(
      '.modal-card-body p'
    ).innerHTML = ingredients;
  }
  _openModal() {
    this._open = true;
    this._shadowRoot.querySelector('.modal').classList.add('is-active');
  }
  _closeModal() {
    this._open = false;
    this._shadowRoot.querySelector('.modal').classList.remove('is-active');
  }
  get open() {
    return this._open;
  }
  set open(value) {
    value === true ? this._openModal() : this._closeModal();
  }
  get recipe() {
    return this._recipe;
  }
  set recipe(recipe) {
    this._recipe = recipe;
    this._render(this._recipe);
  }
}

customElements.define('recipe-modal', Modal);
