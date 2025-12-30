class TemplateManager {
    
    static instance = null;
    
    templates = {};
   
    constructor() {
        console.log('caches' in window)
        console.log(window.caches)
        console.log('TemplateManager constructor called');
        if (TemplateManager.instance) {
            return TemplateManager.instance;
        }
        this.loaded = this.loadTemplates();
    }

    loadTemplates() {
        console.log('Loading templates...');
        return fetch('/templates.html')
            .then(response => response.text())
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const templateElements = doc.querySelectorAll('template');
                templateElements.forEach(template => {
                    this.templates[template.id] = template.cloneNode(true);
                });
                console.log('Templates parsed:', this.templates);
                TemplateManager.instance = this;
                return true;
            })
            .catch(error => {
                console.error('Error loading templates:', error);
            });
    }

    async getTemplateById(id) {
        await this.loaded.then(() => {
            console.log(`Template requested: ${id}`);
            return (this.templates[id]) ? this.templates[id].innerHTML : null;
        });
    }
}

export default new TemplateManager();