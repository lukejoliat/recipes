import { router } from "./router";
window.addEventListener("load", () => {
  // Navigate app to current url
  router.navigateTo(window.location.pathname);

  // Highlight Active Menu on Refresh/Page Reload
  const link = document.querySelector(`a[href$='${window.location.pathname}']`);
  link.classList.add("active");

  const links = document.querySelectorAll("a");
  links.forEach(link => {
    link.addEventListener("click", event => {
      // Block browser page load
      event.preventDefault();

      // Highlight Active Menu on Click
      const target = event.currentTarget;
      document.querySelector(".active").classList.remove("active");
      target.classList.add("active");

      // Navigate to clicked url
      const href = target.getAttribute("href");
      const path = href.substr(href.lastIndexOf("/"));
      router.navigateTo(path);
    });
  });
});
