// maps URLs to views

export class Router {
    constructor(routes = {}) {
      this.routes = routes;
      this.currentPath = '';
      window.addEventListener('popstate', () => this.handleRoute());
      this.handleRoute();
    }
    addRoute(path, handler) {
      this.routes[path] = handler;
    }
    navigate(path) {
      window.history.pushState({}, '', path);
      this.handleRoute();
    }
    getCurrentPath() {
      return window.location.pathname || '/';
    }
    handleRoute() {
      this.currentPath = this.getCurrentPath();
      const handler = this.routes[this.currentPath] || this.routes['*']; // '*' for 404 handler
  
      if (handler) {
        handler();
      } else {
        console.warn(`No handler found for path: ${this.currentPath}`);
      }
    }
    start() {
      this.handleRoute();
    }
  }
  export function createRouter(routes) {
    return new Router(routes);
  }