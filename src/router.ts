const Router = require("vanilla-router");
const hbars = require("handlebars");
import error from "./components/error";
import currencyRates from "./components/currency-rates";
import exchange from "./components/exchange";
import historical from "./components/historical";
import recipes from "./components/recipes";
// Compile Handlebar Templates
let errorTemplate = hbars.compile(error);
const ratesTemplate = hbars.compile(currencyRates);
const exchangeTemplate = hbars.compile(exchange);
const historicalTemplate = hbars.compile(historical);
const recipesTemplate = hbars.compile(recipes);

const el = document.getElementById("app");

// Router Declaration
const router = new Router({
  mode: "history",
  page404: path => {
    const html = errorTemplate({
      color: "yellow",
      title: "Error 404 - Page NOT Found!",
      message: `The path '/${path}' does not exist on this site`
    });
    el.innerHTML = html;
  }
});

window.addEventListener("load", () => {
  router.add("/", () => {
    let html = ratesTemplate();
    el.innerHTML = html;
  });

  router.add("/exchange", () => {
    let html = exchangeTemplate();
    el.innerHTML = html;
  });

  router.add("/historical", () => {
    let html = historicalTemplate();
    el.innerHTML = html;
  });

  router.add("/recipes", () => {
    let html = recipesTemplate();
    el.innerHTML = html;
  });
});

export { router };
