import data from "../assets/data";
const { recipes = [] } = data;
let recipeItems = ``;
recipes.map(
  recipe =>
    (recipeItems += `<recipe-item title="${recipe.title}"></recipe-item>`)
);
export default `<recipe-list><div slot="recipes">${recipeItems}</div></recipe-list>`;
