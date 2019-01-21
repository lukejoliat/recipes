/* global HTMLElement */
import { debounce } from '../../utils/utils'
import template from './recipe-list.html'
import DATA_SERVICE from '../../utils/data'
export default class RecipeList extends HTMLElement {
  constructor () {
    super()
    this._shadowRoot = this.attachShadow({ mode: 'open' })
    this._recipes = []
    this._isFavorites = false
    this.$recipeList = null
    this.$recipes = null
    this.$filter = null
    this.$favorites = null
    this.$all = null
    this.ds = new DATA_SERVICE()
  }
  async connectedCallback () {
    // initialize references
    this._shadowRoot.innerHTML = template
    this.$recipeList = this._shadowRoot.querySelector('.recipe-list')
    this.$filter = this._shadowRoot.querySelector('input')
    this.$favorites = this._shadowRoot.querySelector('.favorite-recipes')
    this.$all = this._shadowRoot.querySelector('.all-recipes')
    // add listeners
    this.$filter.addEventListener('keyup', debounce(() => this._filter(), 150))
    this.$favorites.addEventListener('click', async () => {
      this._isFavorites = true
      this.$favorites.classList.add('is-primary')
      this.$all.classList.remove('is-primary')
      this.ds.cursor = null
      const recipes = await this.ds.getRecipes(
        6,
        this.$filter.value,
        this._isFavorites
      )
      this._render(recipes, true)
      this.$filter.value = ``
    })
    this.$all.addEventListener('click', async () => {
      this._isFavorites = false
      this.$all.classList.add('is-primary')
      this.$favorites.classList.remove('is-primary')
      this.ds.cursor = null
      const recipes = await this.ds.getRecipes(
        6,
        this.$filter.value,
        this._isFavorites
      )
      this._render(recipes, true)
      this.$filter.value = ``
    })
    document.addEventListener('delete-recipe', e => this._delete(e))
    this.recipes = await this.ds.getRecipes(
      6,
      this.$filter.value,
      this._isFavorites
    )
    this._observe()
  }
  disconnectedCallback () {
    document.removeEventListener('update-recipes', this.update)
  }
  _render (recipes = [], fresh) {
    if (fresh) this.$recipeList.innerHTML = ``
    recipes.forEach(r => {
      const recipeItem = document.createElement('recipe-item')
      recipeItem.classList.add('tile')
      recipeItem.classList.add('is-parent')
      recipeItem.classList.add('is-4')
      recipeItem.setAttribute('data-id', r.id)
      this.$recipeList.appendChild(recipeItem)
      recipeItem.recipe = r
    })
  }
  async _filter () {
    const { value } = this.$filter
    this.ds.cursor = null
    let recipes = await this.ds.getRecipes(6, value, this._isFavorites)
    this._render(recipes, true)
  }
  _observe () {
    window.onscroll = () => {
      let bottomOfWindow =
        document.documentElement.scrollTop + window.innerHeight ===
        document.documentElement.offsetHeight
      if (bottomOfWindow) this._next()
    }
  }
  _delete (e) {
    if (e.detail && e.detail.id) {
      this._shadowRoot
        .querySelector(`recipe-item[data-id='${e.detail.id}']`)
        .remove()
    }
  }
  async _next () {
    if (!this.ds.cursor) return
    const recipes = await this.ds.getRecipes(
      6,
      this.$filter.value,
      this._isFavorites
    )
    this._render(recipes)
  }
  set recipes (data = []) {
    this._recipes = data
    this._render(this._recipes)
  }
  get recipes () {
    return this._recipes
  }
}
window.customElements.define('recipe-list', RecipeList)
