const returnRecipes = (recipes = []) => `
<recipe-list>
  <div slot="recipes">
  ${recipes
    .map(recipe => `<recipe-item title="${recipe.title}"></recipe-item>`)
    .join('')}</div>
</recipe-list>`;

const deleteRecipe = title => recipes.filter(x => x.title !== title);

const createRecipe = title => (recipes = [...recipes, { title }]);

export { returnRecipes, deleteRecipe, createRecipe };
