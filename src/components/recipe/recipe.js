export default class Recipe extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._id = null;
    this._title = null;
    this._modal = null;
    this._ingredients = null;
  }
  connectedCallback() {
    this._id = this.getAttribute('id');
    this._title = this.getAttribute('title');
    this._ingredients = this.getAttribute('ingredients');
    this._shadowRoot.innerHTML = `
    <head>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.2/css/bulma.min.css">
    </head>
    <style>
      .panel-block { align-items: center; }
      .recipe-title { flex: 1; }
    </style>
    <a class="panel-block is-active">
    <span class="recipe-title">${this._title}</span>
    <span class="icon has-text-info modal-button open" data-target="modal" aria-haspopup="true">Expand</span>
    <span class="panel-icon"><button class="delete"></button></span>
    </a>
    <recipe-modal open="false"></recipe-modal>`;
    this._modal = this._shadowRoot.querySelector('recipe-modal');
    this._shadowRoot
      .querySelector('.delete')
      .addEventListener('click', () => this._delete());
    this._shadowRoot
      .querySelector('.open')
      .addEventListener('click', () => this._toggleModal());
  }
  _toggleModal() {
    this._modal.open = !!this._modal.open;
  }
  _delete() {
    document.dispatchEvent(
      new CustomEvent('delete', { bubbles: false, detail: this._id })
    );
  }
}

customElements.define('recipe-item', Recipe);
