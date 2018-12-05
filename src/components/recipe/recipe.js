export default class Recipe extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const title = this.getAttribute("title");
    this.attachShadow({ mode: "open" }).innerHTML = `
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.2/css/bulma.min.css">
    <style>
      .panel-block { align-items: center; }
      .recipe-title { flex: 1; }
    </style>
    <link rel="stylesheet" href="./recipe.css">
    <a class="panel-block is-active">
    <span class="recipe-title">${title}</span>
    <span class="panel-icon"><button class="delete"></button></span>
    </a>`;
  }
}

customElements.define("recipe-item", Recipe);
