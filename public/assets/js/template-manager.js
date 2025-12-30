const cacheName = "newCache";
const templateUrl = "/templates.html";

class TemplateManager {
  static instance = null;
  ready = null;
  templateCache = null;
  
  constructor() {
    if (TemplateManager.instance) {
      return TemplateManager.instance;
    }

    this.ready = this.init(cacheName, templateUrl);
  }

  async init(cacheName, templateUrl) {
    const cache = await caches.open(cacheName);
    await cache.add(templateUrl);
    this.templateCache = cache;
  }

  async getTemplateById(id) {
    await this.ready.then();
    let response = await this.templateCache.match(templateUrl);

    if(!response) {
      response = await fetch(templateUrl);
    }

    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const template = doc.getElementById(id);
    if (template) {
      console.log(`Template ${id} found.`);
      return template.innerHTML;
    } else {
      console.warn(`Template ${id} not found.`);
      return null;
    }
  }
}

export default new TemplateManager();
