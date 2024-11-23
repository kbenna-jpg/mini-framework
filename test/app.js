import { createElement, render } from '../src/dom.js';
import { EventManager } from '../src/events.js';

const eventManager = new EventManager();
let todos = [];

// Event listeners for adding, deleting and modifying items
eventManager.on('itemAdded', (newItem) => {
  console.log(`New item added: ${newItem}`);
  renderApp(); 
});

eventManager.on('itemDeleted', (index) => {
  console.log(`Item deleted at index: ${index}`);
  todos.splice(index, 1); // remove item from todos array
  renderApp(); 
});

eventManager.on('itemModified', ({ index, newValue }) => {
  console.log(`Item modified at index: ${index}, new value: ${newValue}`);
  todos[index] = newValue; // update todo item with the new value
  renderApp(); 
});

// Functions to add, delete and modify items
function addItem() {
  const input = document.getElementById('todo-input');
  const newItem = input.value.trim();

  if (newItem) {
    todos.push(newItem); 
    input.value = ''; 
    eventManager.trigger('itemAdded', newItem); 
  }
}

function deleteItem(index) {
  eventManager.trigger('itemDeleted', index); 
}


function modifyItem(index) {
  const newValue = prompt('Enter the new value for this item:', todos[index]);
  if (newValue !== null && newValue.trim() !== '') {
    eventManager.trigger('itemModified', { index, newValue: newValue.trim() }); 
  }
}


function renderTodoList() {
  if (todos.length === 0) {
    return createElement('p', {}, 'No items yet.');
  }

  return createElement(
    'div',
    { id: 'todo-list' }, 
    todos.map((todo, index) =>
      createElement('div', { class: 'todo-item' }, [
        createElement('span', {}, todo), 
        createElement(
          'button',
          { onclick: () => modifyItem(index) },
          'Modify'
        ), 
        createElement(
          'button',
          { onclick: () => deleteItem(index) },
          'Delete'
        ), 
      ])
    )
  );
}


function renderApp() {
  const app = createElement('div', { id: 'app', class: 'container' }, [
    createElement('h1', {}, 'To-Do App'),
    createElement('input', {
      id: 'todo-input',
      type: 'text',
      placeholder: 'Enter a new to-do',
    }),
    createElement(
      'button',
      { onclick: addItem },
      'Add Item'
    ),
    renderTodoList(),
  ]);

  render(app, document.getElementById('root')); 
}


renderApp();