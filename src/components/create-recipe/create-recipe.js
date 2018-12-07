import { router } from '../../router';
const template = `
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.2/css/bulma.min.css">

  <div class="field">
    <label class="label">Name</label>
      <input
        class="input"
        type="text"
      />
    </div>
  </div>

  <div class="field is-grouped">
    <div class="control"><button class="button is-link create">Submit</button></div>
    <div class="control"><button class="button is-text cancel">Cancel</button></div>
  </div>`;
class CreateRecipe extends HTMLElement {
  connectedCallback() {
    this._shadowRoot = this.attachShadow({
      mode: 'open'
    });
    this._shadowRoot.innerHTML = template;
    this._shadowRoot.querySelector('.create').addEventListener('click', () => {
      const title = this._shadowRoot.querySelector('input').value;
      this.dispatchEvent(
        new CustomEvent('create', { bubbles: true, detail: title })
      );
      router.navigateTo('/');
    });
    this._shadowRoot
      .querySelector('.cancel')
      .addEventListener('click', () => router.navigateTo('/'));
  }
}

customElements.define('create-recipe', CreateRecipe);
