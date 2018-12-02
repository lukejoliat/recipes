class Recipe extends HTMLElement {
  constructor() {
    super();
    this.bootstrap();
    // this.attachShadow({ mode: "open" }).innerHTML = `test`;
  }
  createdCallback() {
    template = script.querySelector("template");
    component = document.importNode(template.content, true);
    root = this.createShadowRoot();

    component.getElementById("title").innerText = this.getAttribute("title");

    root.appendChild(component);

    this.addEventListener("data", function(e) {
      module.init(e.detail, root);
    });
  }
  bootstrap() {
    var component, template, root, proto, script;

    script = document.currentScript.ownerDocument;
  }
}
customElements.define("recipe-item", Recipe);
