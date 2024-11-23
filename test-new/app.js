// app.js
import { createElement, render } from '../src/dom.js';
import { EventManager } from '../src/events.js';
import { createStore } from '../src/state.js';
import { createRouter } from '../src/router.js';

// Initialize framework pieces
const eventManager = new EventManager();
const store = createStore({
  todos: [] // Each todo will be { text: string, completed: boolean }
});

// Router setup
const router = createRouter({
  '/': () => renderApp('all'),
  '/active': () => renderApp('active'),
  '/completed': () => renderApp('completed'),
  '*': () => renderApp('all')
});

// Event listeners
eventManager.on('itemAdded', (text) => {
  const currentState = store.getState();
  store.setState({
    todos: [...currentState.todos, { text, completed: false }]
  });
  console.log(`New item added: ${text}`);
});

eventManager.on('itemDeleted', (index) => {
  const currentState = store.getState();
  const newTodos = currentState.todos.filter((_, i) => i !== index);
  store.setState({ todos: newTodos });
  console.log(`Item deleted at index: ${index}`);
});

eventManager.on('itemModified', ({ index, newValue }) => {
  const currentState = store.getState();
  const newTodos = [...currentState.todos];
  newTodos[index] = { ...newTodos[index], text: newValue };
  store.setState({ todos: newTodos });
  console.log(`Item modified at index: ${index}, new value: ${newValue}`);
});

eventManager.on('itemToggled', (index) => {
  const currentState = store.getState();
  const newTodos = [...currentState.todos];
  newTodos[index] = { 
    ...newTodos[index], 
    completed: !newTodos[index].completed 
  };
  store.setState({ todos: newTodos });
  console.log(`Item toggled at index: ${index}, completed: ${newTodos[index].completed}`);
});

// Action functions
function addItem() {
  const input = document.getElementById('todo-input');
  const newItem = input.value.trim();

  if (newItem) {
    eventManager.trigger('itemAdded', newItem);
    input.value = '';
  }
}

function deleteItem(index) {
  eventManager.trigger('itemDeleted', index);
}

function modifyItem(index) {
  const currentState = store.getState();
  const newValue = prompt('Enter the new value for this item:', currentState.todos[index].text);
  if (newValue !== null && newValue.trim() !== '') {
    eventManager.trigger('itemModified', { index, newValue: newValue.trim() });
  }
}

function toggleItem(index) {
  eventManager.trigger('itemToggled', index);
}

// Navigation functions
function navigateTo(path) {
  router.navigate(path);
}

// Render functions
function renderTodoList(filter = 'all') {
  const { todos } = store.getState();
  
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  if (filteredTodos.length === 0) {
    return createElement('p', {}, 'No items yet.');
  }

  return createElement(
    'div',
    { id: 'todo-list' },
    filteredTodos.map((todo, index) =>
      createElement('div', { 
        class: `todo-item ${todo.completed ? 'completed' : ''}` 
      }, [
        createElement('input', {
          type: 'checkbox',
          checked: todo.completed,
          onclick: () => toggleItem(index)
        }),
        createElement('span', {
          style: todo.completed ? 'text-decoration: line-through;' : ''
        }, todo.text),
        createElement(
          'button',
          { 
            onclick: () => modifyItem(index),
            class: 'modify-btn'
          },
          'Modify'
        ),
        createElement(
          'button',
          { 
            onclick: () => deleteItem(index),
            class: 'delete-btn'
          },
          'Delete'
        ),
      ])
    )
  );
}

function renderStats() {
  const { todos } = store.getState();
  const total = todos.length;
  const completed = todos.filter(todo => todo.completed).length;
  const active = total - completed;

  return createElement('div', { class: 'stats' }, [
    createElement('span', {}, `Total: ${total}`),
    createElement('span', {}, `Active: ${active}`),
    createElement('span', {}, `Completed: ${completed}`)
  ]);
}

function renderNavigation() {
  return createElement('nav', { class: 'nav' }, [
    createElement('button', { onclick: () => navigateTo('/') }, 'All'),
    createElement('button', { onclick: () => navigateTo('/active') }, 'Active'),
    createElement('button', { onclick: () => navigateTo('/completed') }, 'Completed')
  ]);
}

function renderApp(filter = 'all') {
  const app = createElement('div', { id: 'app', class: 'container' }, [
    createElement('h1', {}, 'To-Do App'),
    createElement('div', { class: 'input-group' }, [
      createElement('input', {
        id: 'todo-input',
        type: 'text',
        placeholder: 'Enter a new to-do',
        onkeypress: (e) => {
          if (e.key === 'Enter') addItem();
        }
      }),
      createElement(
        'button',
        { onclick: addItem },
        'Add Item'
      ),
    ]),
    renderStats(),
    renderNavigation(),
    renderTodoList(filter),
  ]);

  render(app, document.getElementById('root'));
}

// Subscribe to state changes
store.subscribe(() => {
  const path = router.getCurrentPath();
  const filter = path === '/active' ? 'active' : 
                path === '/completed' ? 'completed' : 'all';
  renderApp(filter);
});

// Start the app
router.start();