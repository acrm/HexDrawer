class EventSourceBase {
  constructor(eventsNames) {
    this.eventHandlers = {};
    eventsNames.forEach(eventName => {
      this.eventHandlers[eventName] = [];
    });
  }

  addListener(eventName, handler) {
    const handlers = this.eventHandlers[eventName];
    if(handlers) {
      handlers.push(handler);
    }
    else
      throw new Error('Unknown event');
  }

  removeListener(eventName, handler) {
    const handlers = this.eventHandlers[eventName];
    if(handlers) {
      const removeIndex = handlers.findIndex(handler);
      if (removeIndex === -1) throw new Error('Handler to registred');
      handlers.splice(removeIndex, 1);
    }
    else
      throw new Error('Unknown event');
  }

  notify(eventName, args) {
    const handlers = this.eventHandlers[eventName];
    if(handlers) {
      handlers.forEach(handler => handler(args));
    }
    else
      throw new Error('Unknown event');
  }
}