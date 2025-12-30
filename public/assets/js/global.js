import { TemplatedElement,  HeaderElement, SidebarElement, MainElement, FooterElement } from './custom-elements.js';

function init() {
    customElements.define('templated-element', TemplatedElement);
    customElements.define('header-element', HeaderElement);
    customElements.define('sidebar-element', SidebarElement);
    customElements.define('main-element', MainElement);
    customElements.define('footer-element', FooterElement);
}

init();

export { init };