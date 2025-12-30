// console.log("caches" in window);
// console.log(window.caches);
const cacheName = "newCache";
const templateUrl = "/templates.html";
// caches.open(cacheName).then((cache) => {
//   cache.addAll(templateUrls).then(() => {
//     console.log("Cache add Success");
//   });
// });

class TemplateManager {
  static instance = null;
  ready = null;
  templateCache = null;
  // templates = null;
  
  constructor() {
    console.log("TemplateManager constructor called");
    if (TemplateManager.instance) {
      return TemplateManager.instance;
    }

    // this.ready = caches.open(cacheName).then((cache) => {
    //   cache.addAll(templateUrl)
    //   this.templateCache = cache;
    // });

    this.ready = this.init(cacheName, templateUrl);
  }

  async init(cacheName, templateUrl) {
    const cache = await caches.open(cacheName);
    console.log("Opened cache:", cacheName);
    await cache.add(templateUrl);
    console.log("Cache add Success:", templateUrl);
    this.templateCache = cache;
    // const response = await cache.match(templateUrl);
    // if (response) {
    //   const html = await response.text();
    //   const parser = new DOMParser();
    //   const doc = parser.parseFromString(html, "text/html");
    //   const templateElements = doc.querySelectorAll("template");
    //   this.templates = this.templates || {};
    //   templateElements.forEach((template) => {
    //     this.templates[template.id] = template.cloneNode(true);
    //   });
    //   console.log("Templates parsed:", this.templates);
    //   TemplateManager.instance = this;
    // } else {
    //   console.warn("No cached templates.html found.");
    // }
  }

  // async openCache(cacheName, templateUrls) {
  //   const cache = await caches.open(cacheName);
  //   await cache.add(templateUrls[0]);
  //   this.templateCache = cache;
  //   console.log("Cache addAll Success");
  // }

  // async loadTemplates() {
    
  //   await this.openCache(cacheName, templateUrl);
    
  //   console.log("Loading templates...");
    
  //   try {
  //     const response = await fetch("/templates.html");
  //     const html = await response.text();
  //     const parser = new DOMParser();
  //     const doc = parser.parseFromString(html, "text/html");
  //     const templateElements = doc.querySelectorAll("template");
  //     this.templates = this.templates || {};
  //     templateElements.forEach((template) => {
  //       this.templates[template.id] = template.cloneNode(true);
  //     });
  //     console.log("Templates parsed:", this.templates);
  //     TemplateManager.instance = this;
  //   } catch (error) {
  //     console.error("Error loading templates:", error);
  //   }
  // }

  async getTemplateById(id) {
    await this.ready.then(() => {
      console.log(`Template requested: ${id}`);
    });
    
    let response = await this.templateCache.match(templateUrl);

    if(!response) {
      response = await fetch(templateUrl);
      console.log('Fetched templates.html from network:', templateUrl);
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
