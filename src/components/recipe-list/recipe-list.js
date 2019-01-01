/* global HTMLElement */
import { debounce, filter } from '../../utils/utils'
import template from './recipe-list.html'
import { isValidRecipe } from '../../models/RecipeModel'
const DATA_SERVICE =
  process.env.NODE_ENV === 'development'
    ? require('../../utils/data-dev')
    : require('../../utils/data')
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
    this.update = async () => (this.recipes = await DATA_SERVICE.getRecipes())
  }
  connectedCallback () {
    // initialize references
    this._shadowRoot.innerHTML = template
    this.$recipeList = this._shadowRoot.querySelector('.recipe-list')
    this.$filter = this._shadowRoot.querySelector('input')
    this.$favorites = this._shadowRoot.querySelector('.favorite-recipes')
    this.$all = this._shadowRoot.querySelector('.all-recipes')
    // add listeners
    this.$filter.addEventListener('keyup', debounce(() => this._filter(), 150))
    this.$favorites.addEventListener('click', () => {
      this._isFavorites = true
      this.$favorites.classList.add('is-active')
      this.$all.classList.remove('is-active')
      this._favorites()
      this.$filter.value = ``
    })
    this.$all.addEventListener('click', () => {
      this._isFavorites = false
      this.$all.classList.add('is-active')
      this.$favorites.classList.remove('is-active')
      this._render(this._recipes)
      this.$filter.value = ``
    })
    document.addEventListener('update-recipes', this.update)
  }
  disconnectedCallback () {
    document.removeEventListener('update-recipes', this.update)
  }
  _render (recipes = []) {
    // TODO: not very efficient, too many loops
    this.$recipeList.innerHTML = recipes.length
      ? recipes
        .map(r => {
          if (isValidRecipe(r)) {
            return `<recipe-item title="${r.title}"></recipe-item>`
          }
        })
        .join('')
      : `<a class="panel-block is-active"><span class="recipe-title">Sorry, no recipes could be found.</span>`
    this.$recipes = this._shadowRoot.querySelectorAll('recipe-item')
    this.$recipes.forEach((r, i) => (r.recipe = recipes[i]))
  }
  _filter () {
    const { value } = this.$filter
    filter(this.$recipes, value)
  }
  _favorites () {
    this._render(this._recipes.filter(r => r.favorite))
  }
  set recipes (data = []) {
    if (data === this._recipes) return
    this._recipes = data
    this._isFavorites ? this._favorites() : this._render(this._recipes)
  }
  get recipes () {
    return this._recipes
  }
}
window.customElements.define('recipe-list', RecipeList)
