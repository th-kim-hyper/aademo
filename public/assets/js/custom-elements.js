import templateManager from "./template-manager.js";

await templateManager.ready;
// const templates = templateManager.templates;
const headersTemplate = await templateManager.getTemplateById(
  "header-template"
);
console.log("Templates available in HeaderElement:", headersTemplate);

class HeaderElement extends HTMLElement {
  ready = null;
//   templateHTML = null;
  tagHTML = null;

  constructor() {
    super();
    console.log("HeaderElement constructor called:", this.innerHTML);
    this.ready = templateManager
      .getTemplateById("header-template")
      .then((templateHTML) => {
        console.log("HeaderElement templateHTML loaded and set", templateHTML);
        this.tagHTML = this.innerHTML;
        this.innerHTML = templateHTML;
        // this.innerHTML = templateHTML;
      });
  }

  async connectedCallback() {
    await this.ready.then(() => {
      console.log("HeaderElement ready resolved in connectedCallback");
    });
    // this.innerHTML = this.templateHTML;
    console.log("HeaderElement content set from templateHTML");
  }
  //   const element = document.createElement("div");
  //   element.innerHTML = this.tagHTML;
  //   const slots = element.querySelectorAll("slot");
  //   slots.forEach((slot) => {
  //     const name = slot.getAttribute("name");
  //     if (name) {
  //       const assignedElements = this.querySelectorAll(`[slot="${name}"]`);
  //       assignedElements.forEach((el) => {
  //         slot.replaceWith(el);
  //       });
  //     }
  //   });
  //   const $p = this.querySelector("h1");
  //   if ($p) {
  //     $p.style.cursor = "pointer";
  //     $p.onclick = () => {
  //       console.log("HeaderElement paragraph clicked");
  //     };
  //   }
  //   console.log("HeaderElement connected to the DOM");
}

// customElements.define('header-element', HeaderElement);

export { HeaderElement };
