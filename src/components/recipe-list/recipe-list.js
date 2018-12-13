export default class RecipeList extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._recipes = [];
    this._isFavorites = false;
    this.$recipeList = null;
    this.$filter = null;
    this.$all = null;
    this.$favorites = null;
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
    <p class="panel-tabs"><a class="all-recipes is-active">all</a><a class="favorite-recipes">favorites</a></p>
    <div class="recipe-list"></div>
    </div>`;
    this.$recipeList = this._shadowRoot.querySelector('.recipe-list');
    this.$filter = this._shadowRoot.querySelector('input');
    this.$favorites = this._shadowRoot.querySelector('.favorite-recipes');
    this.$all = this._shadowRoot.querySelector('.all-recipes');
    this.$filter.addEventListener('keyup', () => this._filter());
    this.$favorites.addEventListener('click', () => {
      this._isFavorites = true;
      this.$favorites.classList.add('is-active');
      this.$all.classList.remove('is-active');
      this._favorites();
    });
    this.$all.addEventListener('click', () => {
      this.$favorites.classList.remove('is-active');
      this.$all.classList.add('is-active');
      this._isFavorites = false;
      this._render(this._recipes);
    });
  }
  _render(recipes = []) {
    this.$recipeList.innerHTML = recipes.length
      ? recipes.map(r => `<recipe-item></recipe-item>`).join('')
      : `<a class="panel-block is-active"><span class="recipe-title">Sorry, no recipes could be found.</span>`;
    this._shadowRoot
      .querySelectorAll('recipe-item')
      .forEach((r, i) => (r.recipe = recipes[i]));
  }
  _filter() {
    const { value = `` } = this.$filter;
    this._isFavorites
      ? this._render(
          this._recipes.filter(r => r.title.startsWith(value) && r.favorite)
        )
      : this._render(this._recipes.filter(r => r.title.startsWith(value)));
  }
  _favorites() {
    this._render(this._recipes.filter(r => r.favorite));
  }
  set recipes(data = []) {
    if (data === this._recipes) return;
    this._recipes = data;
    this._isFavorites ? this._favorites() : this._render(this._recipes);
  }
  get recipes() {
    return this._recipes;
  }
}
customElements.define('recipe-list', RecipeList);
