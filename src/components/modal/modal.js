/* global HTMLElement */
import template from './modal.html'
export default class Modal extends HTMLElement {
  constructor () {
    super()
    this._shadowRoot = this.attachShadow({ mode: 'open' })
    this._open = false
  }
  connectedCallback () {
    this._shadowRoot.innerHTML = template
    this._shadowRoot
      .querySelectorAll('.modal-close')
      .forEach(i => i.addEventListener('click', () => this._closeModal()))
  }
  _render () {}
  _openModal () {
    this._open = true
    this._shadowRoot.querySelector('.modal').classList.add('is-active')
  }
  _closeModal () {
    this._open = false
    this._shadowRoot.querySelector('.modal').classList.remove('is-active')
  }
  get open () {
    return this._open
  }
  set open (value) {
    value === true ? this._openModal() : this._closeModal()
  }
}

window.customElements.define('recipe-modal', Modal)
