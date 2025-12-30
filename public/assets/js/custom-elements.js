import templateManager from "./template-manager.js";

await templateManager.loaded;
const templates = templateManager.templates;
console.log('Templates available in HeaderElement:', templates);

class HeaderElement extends HTMLElement {

    templateHTML = templates['header-template'].innerHTML;

    constructor() {
        super();
        console.log('HeaderElement constructor called');
        // templateManager.getTemplateById('header-template').then(template => {
        //     this.innerHTML = template?.innerHTML;
        //     console.log('HeaderElement template loaded and set', template);
        // });
        //
        this.innerHTML = `<h1>Header Component Loaded</h1>`;
    }
    
    connectedCallback() {
        this.innerHTML = this.templateHTML;
        const $p = this.querySelector('h1');
        if ($p) {
            $p.style.cursor = 'pointer';
            $p.onclick = () => {
                console.log('HeaderElement paragraph clicked');
            }
        }
        console.log('HeaderElement connected to the DOM');
    }
}

// customElements.define('header-element', HeaderElement);

export { HeaderElement };