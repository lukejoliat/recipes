import Recipe from '../models/Recipe';

const deleteRecipe = id => {
  const recipes = getRecipes().filter(r => r.id !== id);
  localStorage.setItem('recipes', JSON.stringify(recipes));
};

const createRecipe = (recipes = [], recipe) => {
  const items = JSON.stringify([...recipes, new Recipe(recipe)]);
  localStorage.setItem('recipes', items);
};

const getRecipes = () => JSON.parse(localStorage.getItem('recipes')) || [];

export { deleteRecipe, createRecipe, getRecipes };
