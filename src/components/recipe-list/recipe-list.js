export default class RecipeList extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({
      mode: 'open'
    });
    this.root.innerHTML = `
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.2/css/bulma.min.css">
    <div data-role="container">
    <p class="panel-heading">Recipes</p>
    <div class="panel-block">
      <p class="control has-icons-left">
        <input class="input is-small" type="text" placeholder="search" />
        <span class="icon is-small is-left">
          <i class="fas fa-search" aria-hidden="true"></i>
        </span>
      </p>
    </div>
    <p class="panel-tabs"><a class="is-active" onClick="(${this.click})()
    ">all</a> <a>favorites</a></p>
    <slot name="recipes">No Recipes Found.</slot>
    </div>`;
  }
  connectedCallback() {
    this.navContainer = this.root.querySelector('div');
  }
  click() {
    event = new CustomEvent('customEvent', {
      test: 'test'
    });
    this.navContainer.dispatchEvent(event);
  }
}
customElements.define('recipe-list', RecipeList);
