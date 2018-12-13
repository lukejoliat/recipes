import Router from 'vanilla-router';
import error from './components/error';
import {
  deleteRecipe,
  createRecipe,
  getRecipes,
  favoriteRecipe,
  unFavoriteRecipe
} from './utils/data';
const el = document.getElementById('app');

// Router Declaration
const router = new Router({
  mode: 'history',
  page404: path => {
    const html = error(
      'yellow',
      'Error 404 - Page NOT Found!',
      `The path '/${path}' does not exist on this site`
    );
    el.innerHTML = html;
  }
});

// Routes
window.addEventListener('load', () => {
  router.add('/', () => {
    el.innerHTML = `<recipe-list></recipe-list>`;
    el.querySelector('recipe-list').recipes = getRecipes();
    document.addEventListener('delete', event => {
      deleteRecipe(event.detail);
      el.querySelector('recipe-list').recipes = getRecipes();
    });
    document.addEventListener('togglefavorite', event => {
      if (event.detail && event.detail.id) {
        event.detail.favorite
          ? unFavoriteRecipe(event.detail.id)
          : favoriteRecipe(event.detail.id);
        el.querySelector('recipe-list').recipes = getRecipes();
      }
    });
  });
  router.add('/create', () => {
    el.innerHTML = `<create-recipe></create-recipe>`;
    el.querySelector('create-recipe').addEventListener('create', event =>
      createRecipe(getRecipes(), event.detail)
    );
  });
});

export { router };
