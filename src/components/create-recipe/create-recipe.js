import { router } from '../../router'
import { isValidRecipe } from '../../models/RecipeModel'
import template from './create-recipe.html'
import { parse, sanitize } from '../../utils/utils'
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
    this.$fileInput = null
    this._file = null
  }
  connectedCallback () {
    this._shadowRoot.innerHTML = template
    this.$fileInput = this._shadowRoot.querySelector('input[type=file]')
    this._shadowRoot
      .querySelector('.create')
      .addEventListener('click', () => this._create())
    this._shadowRoot
      .querySelector('.cancel')
      .addEventListener('click', () => router.navigateTo('/'))
    this.$fileInput.addEventListener('change', async () => {
      this._file = await parse(this.$fileInput.files[0])
      const image = new window.Image(100, 100)
      image.src = this._file
      this.$fileInput.after(image)
    })
  }
  async _create () {
    const title = sanitize(this._shadowRoot.querySelector('input').value)
    const ingredients = sanitize(
      this._shadowRoot.querySelector('textarea').value
    )
    const recipe = { title, ingredients, image: this._file }
    if (isValidRecipe(recipe)) {
      // TODO: add service here? What good does the event do?
      try {
        await DATA_SERVICE.createRecipe(await DATA_SERVICE.getRecipes(), recipe)
        router.navigateTo('/')
      } catch (e) {
        window.alert(e)
      }
    }
  }
}

window.customElements.define('create-recipe', CreateRecipe)
