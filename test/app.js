import { createElement, render } from './src/dom.js';

const app = createElement('div', { id: 'app', class: 'container' }, [
    createElement('h1', {}, 'Hello, Mini-Framework!'),
    createElement('p', {}, 'This is a test of the DOM abstraction.'),
    createElement('button', { onclick: () => alert('Button clicked!') }, 'Click Me'),
]);


render(app, document.getElementById('root'));
