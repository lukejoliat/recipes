import Recipe from '../models/Recipe';

const getRecipe = id => getRecipes().find(id);

const deleteRecipe = id => {
  const recipes = getRecipes().filter(r => r.id !== id);
  localStorage.setItem('recipes', JSON.stringify(recipes));
};

const createRecipe = (recipes = [], recipe) => {
  const items = JSON.stringify([...recipes, new Recipe(recipe)]);
  localStorage.setItem('recipes', items);
};

const favoriteRecipe = id => {
  const recipes = getRecipes();
  recipes.map(r => {
    if (r.id === id) r.favorite = true;
  });
  localStorage.setItem('recipes', JSON.stringify(recipes));
};

const unFavoriteRecipe = id => {
  const recipes = getRecipes();
  recipes.map(r => {
    if (r.id === id) r.favorite = false;
  });
  localStorage.setItem('recipes', JSON.stringify(recipes));
};

const getRecipes = () => JSON.parse(localStorage.getItem('recipes')) || [];

export {
  deleteRecipe,
  createRecipe,
  getRecipes,
  getRecipe,
  favoriteRecipe,
  unFavoriteRecipe
};
