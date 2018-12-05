import Router from 'vanilla-router';
import handlebars from 'handlebars';
import error from './components/error';
import recipes from './components/recipes';
import createRecipe from './components/recipe-form';
// Compile Handlebar Templates
const errorTemplate = handlebars.compile(error);
const recipesTemplate = handlebars.compile(recipes);
const recipeFormTemplate = handlebars.compile(createRecipe);
const el = document.getElementById('app');

// Router Declaration
const router = new Router({
  mode: 'history',
  page404: path => {
    const html = errorTemplate({
      color: 'yellow',
      title: 'Error 404 - Page NOT Found!',
      message: `The path '/${path}' does not exist on this site`
    });
    el.innerHTML = html;
  }
});

window.addEventListener('load', () => {
  router.add('/', () => {
    let html = recipesTemplate();
    el.innerHTML = html;
    const recipeList = document.querySelector('recipe-list');
    recipeList.addEventListener('customEvent', () => {
      console.log('test');
    });
  });
  router.add('/create', () => {
    let html = recipeFormTemplate();
    el.innerHTML = html;
  });
});

export { router };
