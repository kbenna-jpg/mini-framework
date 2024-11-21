// Handle events triggered by the user, like: scrolling, clicking, certain keybindings
// note: different than addEventListener()

export class EventManager {
    constructor() {
      this.events = {}; 
    }
    /**
     * Register an event listener for a specific event.
     * @param {string} eventName - The name of the event.
     * @param {function} callback - The callback to execute when the event is triggered.
     */
    on(eventName, callback) {
      if (!this.events[eventName]) { // does this event name belong in events object?
        this.events[eventName] = []; 
      }
      this.events[eventName].push(callback); 
    }
  
    /**
     * Trigger an event and execute all its listeners.
     * @param {string} eventName - The name of the event to trigger.
     * @param {any} data - The data to pass to the event listeners.
     */
    trigger(eventName, data) {
      const listeners = this.events[eventName];
      if (listeners) {
        listeners.forEach((callback) => callback(data));
      }
    }
  
    /**
     * Remove a specific listener for an event.
     * @param {string} eventName - The name of the event.
     * @param {function} callback - The callback to remove.
     */
    off(eventName, callback) {
      if (this.events[eventName]) {
        this.events[eventName] = this.events[eventName].filter(
          (listener) => listener !== callback
        );
      }
    }
  }
  