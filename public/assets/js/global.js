import { HeaderElement } from './custom-elements.js';

// var $footer = document.querySelector('footer');
// console.log('Global JS loaded - footer element:', $footer);

// customElements.whenDefined('header-component').then(() => {
//     console.log('header-component is defined');
// });

// customElements.define('header-element', HeaderElement);

// document.addEventListener('DOMContentLoaded', function () {
//     console.log('Global JS DOMContentLoaded fired');
// });


function init() {
    customElements.define('header-element', HeaderElement);
    console.log('header-element defined');
}

init();

export { init };