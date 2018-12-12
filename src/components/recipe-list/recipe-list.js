export default class RecipeList extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._recipes = [];
    this.$recipeList = null;
    this.$filter = null;
  }
  connectedCallback() {
    this._shadowRoot.innerHTML = `
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.2/css/bulma.min.css">
    <div data-role="container">
    <p class="panel-heading">Recipes</p>
    <div class="panel-block">
      <p class="control">
        <input class="input is-small" type="text" placeholder="search" />
      </p>
    </div>
    <p class="panel-tabs"><a class="is-active">all</a> <a>favorites</a></p>
    <div class="recipe-list"></div>
    </div>`;
    this.$recipeList = this._shadowRoot.querySelector('.recipe-list');
    this.$filter = this._shadowRoot.querySelector('input');
    this.$filter.addEventListener('keyup', this._filter.bind(this));
  }
  _render(recipes = []) {
    this.$recipeList.innerHTML = recipes.length
      ? recipes
          .map(
            r =>
              `<recipe-item id="${r.id}" title="${r.title}" ingredients="${
                r.ingredients
              }"></recipe-item>`
          )
          .join('')
      : `<a class="panel-block is-active"><span class="recipe-title">Sorry, no recipes could be found.</span>`;
  }
  _filter() {
    const { value = `` } = this.$filter;
    this._render(this._recipes.filter(r => r.title.startsWith(value)));
  }
  set recipes(data = []) {
    if (data === this._recipes) return;
    this._recipes = data;
    this._render(data);
  }
  get recipes() {
    return this._recipes;
  }
}
customElements.define('recipe-list', RecipeList);
