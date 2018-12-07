import Router from 'vanilla-router';
import error from './components/error';
import { returnRecipes, createRecipe, deleteRecipe } from './utils/utils';
const el = document.getElementById('app');
let recipes = [
  { id: 1, title: 'Cheese' },
  { id: 1, title: 'Pasta' },
  { id: 1, title: 'Bread' },
  { id: 1, title: 'Salami' }
];

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

// Delete
document.addEventListener('delete', ({ detail }) => {
  recipes = deleteRecipe(detail);
  el.innerHTML = returnRecipes(recipes);
});

// Create
document.addEventListener('create', ({ detail }) => {
  recipes = createRecipe(detail);
  el.innerHTML = returnRecipes(recipes);
});

// Routes
window.addEventListener('load', () => {
  router.add('/', () => {
    el.innerHTML = returnRecipes(recipes);
  });
  router.add('/create', () => {
    el.innerHTML = `<create-recipe></create-recipe>`;
  });
});

export { router };
