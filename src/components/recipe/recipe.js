import RecipeItem from '../../models/Recipe';
export default class Recipe extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._recipe = null;
  }
  connectedCallback() {
    this._shadowRoot.innerHTML = `
    <head>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.2/css/bulma.min.css">
    </head>
    <style>
      .panel-block { align-items: center; }
      .recipe-title { flex: 1; }
    </style>
    <a class="panel-block is-active">
      <span class="recipe-title"></span>
      <span class="has-text-info modal-button open" data-target="modal" aria-haspopup="true">Expand</span>
      <span class="has-text-info modal-button" data-target="modal" aria-haspopup="true">|</span>
      <span class="has-text-info modal-button favorite" data-target="modal" aria-haspopup="true"></span>
      <span class="panel-icon"><button class="delete"></button></span>
    </a>
    <recipe-modal></recipe-modal>`;
    this._modal = this._shadowRoot.querySelector('recipe-modal');
    this._shadowRoot
      .querySelector('.delete')
      .addEventListener('click', () => this._delete());
    this._shadowRoot
      .querySelector('.open')
      .addEventListener('click', () => this._toggleModal());
    this._shadowRoot
      .querySelector('.favorite')
      .addEventListener('click', () => this._toggleFavorite());
  }
  _render(title) {
    this._shadowRoot.querySelector('.recipe-title').innerHTML = title;
    this._shadowRoot.querySelector('.favorite').innerHTML = this._recipe
      .favorite
      ? 'Unfavorite'
      : 'Favorite';
  }
  _toggleModal() {
    this._modal.open = !this._modal.open;
    this._modal.recipe = this._recipe;
  }
  _delete() {
    document.dispatchEvent(
      new CustomEvent('delete', { bubbles: false, detail: this._recipe.id })
    );
  }
  _toggleFavorite() {
    document.dispatchEvent(
      new CustomEvent('togglefavorite', {
        bubbles: false,
        detail: { id: this._recipe.id, favorite: this.recipe.favorite }
      })
    );
  }
  get recipe() {
    return this._recipe;
  }
  set recipe(recipe) {
    this._recipe = recipe;
    this._render(this._recipe.title);
  }
}

customElements.define('recipe-item', Recipe);
