// create element func
// 1. Create an element based on a tag name.
// 2. Add attributes and event listeners to the element.
// 3. Handle child elements recursively.
// src/dom.js

/**
 * Creates a DOM element with specified attributes and children.
 * @param {string} tag - The HTML tag name (e.g., 'div', 'h1').
 * @param {Object} attributes - Attributes for the element (e.g., id, class, event listeners).
 * @param {Array} children - Child elements or text nodes.
 * @returns {HTMLElement} - The created DOM element.
 */
export function createElement(tag, attributes = {}, children = []) {
  const element = document.createElement(tag);

  // Set attributes
  Object.keys(attributes).forEach((key) => {
    if (key.startsWith('on') && typeof attributes[key] === 'function') {
      const event = key.slice(2).toLowerCase();
      element.addEventListener(event, attributes[key]);
    } else {
      element.setAttribute(key, attributes[key]);
    }
  });

  children.forEach((child) => {
    if (typeof child === 'string') {
      element.appendChild(document.createTextNode(child));
    } else {
      element.appendChild(child);
    }
  });

  return element;
}

/**
 * Renders an element inside a container, clearing previous content.
 * @param {HTMLElement} element - The DOM element to render.
 * @param {HTMLElement} container - The container element to render into.
 */

export function render(element, container) {
  container.innerHTML = ''; // clear container
  container.appendChild(element); // append new content
}

  