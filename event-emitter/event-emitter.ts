export class EventEmitter<E extends Record<string, unknown[]>> {
  #listeners: {
    [K in keyof E]?: Array<{
      cb: (...args: E[K]) => void;
    }>;
  } = {};

  on<K extends keyof E>(
    eventName: K,
    listener: (...args: E[K]) => void,
  ): this {
    if (!this.#listeners[eventName]) {
      this.#listeners[eventName] = [];
    }
    this.#listeners[eventName]!.push({
      cb: listener,
    });
    return this;
  }

  emit<K extends keyof E>(eventName: K, ...args: E[K]): void {
    const listeners = this.#listeners[eventName]?.slice() ?? [];
    for (const { cb } of listeners) {
      cb(...args);
    }
  }
}
