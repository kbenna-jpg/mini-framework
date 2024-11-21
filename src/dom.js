// Create element func
// 1. Create an element based on a tag name.
// 2. Add attributes and event listeners to the element.
// 3. Handle child elements recursively.

/**
 * Create a DOM element with attributes, children, and event listeners.
 * @param {string} tag - The HTML tag to create.
 * @param {Object} attributes - Attributes and event listeners to apply.
 * @param {Array} children - Child elements or strings to append.
 * @returns {HTMLElement} The created DOM element.
 */

export function createElement(tag, attributes = {}, children = []) {

  const element = document.createElement(tag); // if tag is <div>, create line <div></div>

  Object.keys(attributes).forEach((key) => {
    if (key.startsWith('on') && typeof attributes[key] === 'function') { // extract event name
      const event = key.slice(2).toLowerCase();
      element.addEventListener(event, attributes[key]);
    } else {
      element.setAttribute(key, attributes[key]); // if key is "id" and value is "app", this mesns <div id="app"></div>.
    }
  });

  // Normalize children to always be an array
  const childArray = Array.isArray(children) ? children : [children]; 

  childArray.forEach((child) => {
    if (typeof child === 'string') {
      element.appendChild(document.createTextNode(child));
    } else if (child instanceof HTMLElement) { // child is DOM element created by createElement
      element.appendChild(child);
    }
  });

  return element;
}

/**
 * Render a DOM element into a container.
 * @param {HTMLElement} element - The element to render.
 * @param {HTMLElement} container - The container to render into.
 */
export function render(element, container) {
  container.innerHTML = ''; // clear existing element
  container.appendChild(element); 
}


  