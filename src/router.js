import Router from 'vanilla-router';
import error from './components/error';
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
document.addEventListener('delete', ({ detail }) => {
  recipes = deleteRecipe(detail);
  el.innerHTML = returnRecipes();
});
document.addEventListener('create', ({ detail }) => {
  recipes = createRecipe(detail);
  el.innerHTML = returnRecipes();
});
window.addEventListener('load', () => {
  router.add('/', () => {
    el.innerHTML = returnRecipes();
  });
  router.add('/create', () => {
    el.innerHTML = `<create-recipe></create-recipe>`;
  });
});

const returnRecipes = () => `
<recipe-list>
  <div slot="recipes">
  ${recipes
    .map(recipe => `<recipe-item title="${recipe.title}"></recipe-item>`)
    .join('')}</div>
</recipe-list>`;

const deleteRecipe = title => recipes.filter(x => x.title !== title);

const createRecipe = title => (recipes = [...recipes, { title }]);

export { router };
