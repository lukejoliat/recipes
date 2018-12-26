import { debounce } from '../../utils/utils'
import template from './recipe-list.html'
/* global HTMLElement */
export default class RecipeList extends HTMLElement {
  constructor () {
    super()
    this._shadowRoot = this.attachShadow({ mode: 'open' })
    this._recipes = []
    this._isFavorites = false
    this._filterValue = ``
    this.$recipeList = null
    this.$filter = null
    this.$all = null
    this.$favorites = null
  }
  connectedCallback () {
    this._shadowRoot.innerHTML = template
    this.$recipeList = this._shadowRoot.querySelector('.recipe-list')
    this.$filter = this._shadowRoot.querySelector('input')
    this.$favorites = this._shadowRoot.querySelector('.favorite-recipes')
    this.$all = this._shadowRoot.querySelector('.all-recipes')
    this.$filter.addEventListener('keyup', debounce(() => this._filter(), 150))
    this.$favorites.addEventListener('click', () => {
      this._isFavorites = true
      this.$favorites.classList.add('is-active')
      this.$all.classList.remove('is-active')
      this._favorites()
    })
    this.$all.addEventListener('click', () => {
      this._isFavorites = false
      this.$all.classList.add('is-active')
      this.$favorites.classList.remove('is-active')
      this._render(this._recipes)
    })
  }
  _render (recipes = []) {
    this.$recipeList.innerHTML = recipes.length
      ? recipes.map(r => `<recipe-item></recipe-item>`).join('')
      : `<a class="panel-block is-active"><span class="recipe-title">Sorry, no recipes could be found.</span>`
    this._shadowRoot
      .querySelectorAll('recipe-item')
      .forEach((r, i) => (r.recipe = recipes[i]))
  }
  _filter () {
    // TODO only rerender if results of filter are different
    const { value } = this.$filter
    if (value === this._filterValue) return
    this._filterValue = value
    this._isFavorites
      ? this._render(
        this._recipes.filter(r => r.title.startsWith(value) && r.favorite)
      )
      : this._render(this._recipes.filter(r => r.title.startsWith(value)))
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
