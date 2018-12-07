export default class Recipe extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const title = this.getAttribute('title');
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.innerHTML = `
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.2/css/bulma.min.css">
    <style>
      .panel-block { align-items: center; }
      .recipe-title { flex: 1; }
    </style>
    <a class="panel-block is-active">
    <span class="recipe-title">${title}</span>
    <span class="panel-icon"><button class="delete"></button></span>
    </a>`;
    const deleteButton = this._shadowRoot.querySelector('.delete');
    deleteButton.addEventListener('click', () => {
      this.dispatchEvent(
        new CustomEvent('delete', { bubbles: true, detail: title })
      );
    });
  }
}

customElements.define('recipe-item', Recipe);
