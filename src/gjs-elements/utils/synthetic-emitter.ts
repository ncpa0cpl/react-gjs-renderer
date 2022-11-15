export class SyntheticEmitter<E extends Record<string, any[]>> {
  private listeners = new Map<keyof E, Map<symbol, (...args: any[]) => void>>();

  on<K extends keyof E>(event: K, callback: (...args: E[K]) => void) {
    let listeners = this.listeners.get(event);

    if (!listeners) {
      listeners = new Map();
      this.listeners.set(event, listeners);
    }

    const id = Symbol();
    listeners.set(id, callback as any);

    return {
      remove() {
        listeners?.delete(id);
      },
    };
  }

  emit<K extends string>(event: K, ...args: E[K]): void {
    const listeners = this.listeners.get(event);

    if (listeners) {
      listeners.forEach((callback) => callback(...args));
    }
  }

  clear() {
    this.listeners.clear();
  }
}