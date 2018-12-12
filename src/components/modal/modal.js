export default class Modal extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
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
            <h2>${this._title}</h2>
            <p>${this._ingredients}</p>
            </section>
            <footer class="modal-card-foot">
            <button class="button is-success close">Save changes</button>
            <button class="button close">Cancel</button>
            </footer>
        </div>
    </div>`;
  }
  observedAttributes() {
    return ['open'];
  }
  _openModal(modal) {
    this._shadowRoot.querySelector('.modal').classList.add('is-active');
  }
  _closeModal(modal) {
    modal.classList.remove('is-active');
  }
  get open() {
    return this._open;
  }
  set open(value) {
    this._open = value;
    this._openModal();
  }
}

customElements.define('recipe-modal', Modal);
