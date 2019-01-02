import { router } from '../../router'
import template from './create-recipe.html'
import { parse, showError } from '../../utils/utils'
const DATA_SERVICE =
  process.env.NODE_ENV === 'development'
    ? require('../../utils/data-dev')
    : require('../../utils/data') /* global HTMLElement */
export default class CreateRecipe extends HTMLElement {
  constructor () {
    super()
    this._shadowRoot = this.attachShadow({
      mode: 'open'
    })
    this._file = null
    this.$fileInput = null
  }
  connectedCallback () {
    this._shadowRoot.innerHTML = template
    this.$fileInput = this._shadowRoot.querySelector('input[type=file]')
    this._shadowRoot
      .querySelector('.create')
      .addEventListener('click', () => this._create())
    this._shadowRoot
      .querySelector('.cancel')
      .addEventListener('click', () => router.onNavItemClick('/'))
    this.$fileInput.addEventListener('change', async () => this._previewImage())
  }
  async _create () {
    const title = this._shadowRoot.querySelector('input').value
    const ingredients = this._shadowRoot.querySelector('textarea').value
    const image = this.$fileInput.files[0] || null
    const recipe = { title, ingredients, image }
    try {
      await DATA_SERVICE.createRecipe(await DATA_SERVICE.getRecipes(), recipe)
      router.onNavItemClick('/')
    } catch (e) {
      console.error(e)
      showError(
        'Sorry',
        'There was an error creating your recipe, please try again.'
      )
    }
  }
  async _previewImage () {
    this._file = await parse(this.$fileInput.files[0])
    const image = new window.Image(100, 100)
    image.src = this._file
    this.$fileInput.after(image)
  }
}

window.customElements.define('create-recipe', CreateRecipe)
