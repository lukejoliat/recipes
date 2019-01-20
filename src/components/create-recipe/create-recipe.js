/* global HTMLElement */
import { router } from '../../router'
import template from './create-recipe.html'
import { showError } from '../../utils/utils'
import { isValidRecipe } from '../../models/RecipeModel'
// const DATA_SERVICE =
//   process.env.NODE_ENV === 'development'
//     ? require('../../utils/data-dev')
//     : require('../../utils/data')
import DATA_SERVICE from '../../utils/data'
export default class CreateRecipe extends HTMLElement {
  constructor () {
    super()
    this._shadowRoot = this.attachShadow({
      mode: 'open'
    })
    this._file = null
    this.$fileUploader = null
    this.ds = new DATA_SERVICE()
  }
  connectedCallback () {
    this._shadowRoot.innerHTML = template
    this.$fileUploader = this._shadowRoot.querySelector('file-uploader')
    this._shadowRoot
      .querySelector('.create')
      .addEventListener('click', e => this._create(e))
    this._shadowRoot
      .querySelector('.cancel')
      .addEventListener('click', () => router.onNavItemClick('/'))
  }
  async _create (e) {
    const title = this._shadowRoot.querySelector('input').value || null
    const ingredients = this._shadowRoot.querySelector('textarea').value || null
    const image = this.$fileUploader.file || null
    const recipe = { title, ingredients, image, favorite: false }
    if (isValidRecipe({ id: 'test', ...recipe })) {
      e.preventDefault()
      try {
        await this.ds.createRecipe(recipe)
        router.onNavItemClick('/')
      } catch (e) {
        console.error(e)
        showError(
          'Sorry',
          'There was an error creating your recipe, please try again.'
        )
      }
    }
  }
}

window.customElements.define('create-recipe', CreateRecipe)
