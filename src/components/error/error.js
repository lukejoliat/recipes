/* global HTMLElement */
import template from './error.html'
export default class Error extends HTMLElement {
  constructor () {
    super()
    this._shadowRoot = this
    // this.attachShadow({
    //   mode: 'open'
    // })
    this._message = this.getAttribute('message')
    this._title = this.getAttribute('title')
  }
  connectedCallback () {
    this._shadowRoot.innerHTML = template
    this._shadowRoot.querySelector('.error-message').innerText = this._message
    this._shadowRoot.querySelector('.title').innerText = this._title
    this._shadowRoot
      .querySelector('.close')
      .addEventListener('click', () => this._hide())
  }
  static get observedAttributes () {
    return ['title', 'message']
  }
  attributeChangedCallback (name, oldValue, newValue) {
    if (this._shadowRoot) {
      switch (name) {
        case 'title':
          this._shadowRoot.querySelector('.title').innerText = newValue
          break
        case 'message':
          this._shadowRoot.querySelector('.error-message').innerText = newValue
          break
      }
    }
  }
  _hide () {
    this.classList.add('hidden')
  }
}

window.customElements.define('error-message', Error)
