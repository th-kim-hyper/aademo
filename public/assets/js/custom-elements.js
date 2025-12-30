import templateManager from "./template-manager.js";

class TemplatedElement extends HTMLElement {
  static get observedAttributes() {
    return ["template-id"];
  }

  constructor() {
    super();
    console.log("template-id:", this.getAttribute("template-id"));
  }

  // 2. 속성 값이 변경될 때마다 호출됩니다. (Setter와 유사)
  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`${name} 속성이 ${oldValue}에서 ${newValue}로 변경되었습니다.`);
    // this.render();
  }

  async connectedCallback() {
    const templateId = this.getAttribute("template-id");
    const html = await templateManager.getTemplateById(templateId);
    const element = document.createElement("div");
    element.innerHTML = html;
    const slots = element.querySelectorAll("slot");
    slots.forEach((slot) => {
      const name = slot.getAttribute("name");
      if (name) {
        const assignedElements = this.querySelectorAll(`[slot="${name}"]`);
        assignedElements.forEach((el) => {
          slot.replaceWith(el);
        });
      }
    });
    this.innerHTML = element.innerHTML;
  }
}

class HeaderElement extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    const templateHTML = await templateManager.getTemplateById(
      "header-template"
    );
    const element = document.createElement("div");
    element.innerHTML = templateHTML;
    const slots = element.querySelectorAll("slot");
    slots.forEach((slot) => {
      const name = slot.getAttribute("name");
      if (name) {
        const assignedElements = this.querySelectorAll(`[slot="${name}"]`);
        assignedElements.forEach((el) => {
          slot.replaceWith(el);
        });
      }
    });
    this.innerHTML = element.innerHTML;
  }
}

class SidebarElement extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    const templateHTML = await templateManager.getTemplateById(
      "sidebar-template"
    );
    const element = document.createElement("div");
    element.innerHTML = templateHTML;
    const slots = element.querySelectorAll("slot");
    slots.forEach((slot) => {
      const name = slot.getAttribute("name");
      if (name) {
        const assignedElements = this.querySelectorAll(`[slot="${name}"]`);
        assignedElements.forEach((el) => {
          slot.replaceWith(el);
        });
      }
    });
    this.innerHTML = element.innerHTML;
  }
}

class MainElement extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    const templateHTML = await templateManager.getTemplateById("main-template");
    const element = document.createElement("div");
    element.innerHTML = templateHTML;
    const slots = element.querySelectorAll("slot");
    slots.forEach((slot) => {
      const name = slot.getAttribute("name");
      if (name) {
        const assignedElements = this.querySelectorAll(`[slot="${name}"]`);
        assignedElements.forEach((el) => {
          slot.replaceWith(el);
        });
      }
    });
    this.innerHTML = element.innerHTML;
  }
}

class FooterElement extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    const templateHTML = await templateManager.getTemplateById(
      "footer-template"
    );
    const element = document.createElement("div");
    element.innerHTML = templateHTML;
    const slots = element.querySelectorAll("slot");
    slots.forEach((slot) => {
      const name = slot.getAttribute("name");
      if (name) {
        const assignedElements = this.querySelectorAll(`[slot="${name}"]`);
        assignedElements.forEach((el) => {
          slot.replaceWith(el);
        });
      }
    });
    this.innerHTML = element.innerHTML;
    console.log("HeaderElement content set from templateHTML");
  }
}

export { TemplatedElement, HeaderElement, SidebarElement, MainElement, FooterElement };
