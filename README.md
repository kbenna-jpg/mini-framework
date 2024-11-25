# Mini-framework

This project simplifies the process of creating web applications by abstracting common tasks such as DOM manipulation, state management, routing, and event handling. The features are implemented in a todo application, a use-case example based on the public [TodoMVC](https://todomvc.com/) framework project.

1. DOM abstraction (dom.js): Create and render elements
2. Routing system (router.js): Map URLs to views
3. State management (state.js): Manage app state
4. Event handling (events.js): Build the event system

## Features
### Creating an element
createElement handles dynamic content: 
```
todos.map((todo) =>
  createElement('div', { class: 'todo-item' }, todo)
);
 ```
 converts each string in the todos array into a `<div>` with the text content of the to-do item.

It also adds event listeners to DOM elements.</br>
`createElement('button', { onclick: addItem }, 'Add Item');` binds the **addItem** function to the button's onclick event. 


### Adding an attribute to an element
createElement also allows you to specify attributes when creating an element. 
It writes HTML directly (like input or button).
```
createElement('input', {
  id: 'todo-input',
  type: 'text',
  placeholder: 'Enter a new to-do',
})
```
Here, attributes are passed as an object in the second parameter represented as key-value pairs.
The result:</br>```<input id="todo-input" type="text" placeholder="Enter a new to-do">```

### Creating an event
EventManager registers events, triggers events and removes event listeners.

```
const eventManager = new EventManager();

eventManager.on('itemAdded', (item) => {
  console.log(`Item added: ${item}`);
});
eventManager.trigger('itemAdded', 'Buy groceries');
```
The event "itemAdded" is registered with a callback that logs the added item.
When the event is triggered with data ("Buy groceries"), all registered callbacks for "itemAdded" are executed.


EventManager also binds elements with event listeners (like onclick, oninput).
```
const button = createElement('button', {
  onclick: () => alert('Button clicked!'),
}, 'Click Me');
```

displays: ```<button>Click Me</button>```</br>
When the button is clicked, the alert is displayed.


### Nesting elements 


## Example Folder Architecture
```
mini-framework/
├── src/
│   ├── dom.js          # DOM abstraction logic
│   ├── router.js       # Routing system logic
│   ├── state.js        # State management logic
│   ├── events.js       # Event handling logic
│   └── index.js        # Entry point
├── examples/
│   ├── todomvc/        # TodoMVC app
├── dist/               # Compiled framework files
├── README.md           # Documentation
├── package.json        # Project metadata
└── .gitignore
```

## Authors
- [Jay Lim (jlim)](https://01.kood.tech/git/jlim)
- [Kawtar Bennani (kbennani)](https://01.kood.tech/git/kbennani)