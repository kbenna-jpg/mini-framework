// manages state actions

export class Store {
    constructor(initialState = {}) {
      this._state = initialState;
      this._subscribers = new Set();
      this._prevState = null;
    }
    getState() {
      return { ...this._state };
    }
    setState(updater) {
      this._prevState = { ...this._state };
      
      if (typeof updater === 'function') {
        this._state = updater(this._state);
      } else {
        this._state = { ...this._state, ...updater };
      }
  
      this._notify();
    }
    subscribe(callback) {
      this._subscribers.add(callback);
      return () => this._subscribers.delete(callback);
    }
    _notify() {
      this._subscribers.forEach(callback => 
        callback(this._state, this._prevState)
      );
    }
    reset() {
      this._prevState = this._state;
      this._state = {};
      this._notify();
    }
  }
  export function createStore(initialState) {
    return new Store(initialState);
  }
  export function createSelector(selector) {
    return (state) => selector(state);
  }