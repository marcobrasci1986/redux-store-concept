export class Store {
  private subscribers: Function[];
  private reducers: { [key: string]: Function };
  private state: { [key: string]: any };


  constructor(reducers: {}, initialState = {}) {
    this.subscribers = [];
    this.reducers = reducers;
    this.state = this.reduce(initialState, {});
  }

  get value() {
    return this.state;
  }

  /**
   * Update the state with an action(type + optional payload)
   * @param action
   */
  dispatch(action) {
    this.state = this.reduce(this.state, action);
    this.notify();
  }

  /**
   * Add a subscriber for the store
   * @param {Function} fn
   */
  subscribe(fn: Function) {
    this.subscribers = [...this.subscribers, fn];
    this.notify();

    return () => {
      console.log('Unsubscribing... ');
      this.subscribers = this.subscribers.filter(subscriber => subscriber != fn);
    }
  }

  private reduce(state, action) {
    const newState = {};

    for (const prop in this.reducers) {
      // newState.todos = this.reducers.todos() -> call it as a function
      newState[prop] = this.reducers[prop](state[prop], action);
    }
    return newState;
  }

  /**
   * Execute all subscribers
   */
  private notify() {
    this.subscribers.forEach(fn => fn(this.value));
  }
}
