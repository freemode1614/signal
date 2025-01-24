/**
 *
 * @example
 *
 * let countSignal = signal(0);
 *
 * const signal1 = countSignal(); // 0
 * countSignal.value = 1;
 * const signal2 = countSignal(); // 1
 *
 */

type Effect<T> = (current: T, previous: T) => void;

class Api<T = unknown> {
  private _preState: T;
  private _state: T;

  private effects = new Set<Effect<T>>();

  constructor(v: T) {
    this._preState = v;
    this._state = v;
  }

  public get(): T {
    return this._state;
  }

  private set(v: T): void {
    this._preState = this._state;
    this._state = v;
    this.notify(this._preState, this._state);
  }

  set value(value: T) {
    this.set(value);
  }

  public subscribe(effect: Effect<T>) {
    this.effects.add(effect);
    return () => {
      this.effects.delete(effect);
    };
  }

  private notify(current: T, previous: T) {
    if (!Object.is(current, previous)) {
      this.effects.forEach((effect) => {
        effect(current, previous);
      });
    }
  }
}

type Node<T> = (() => T) & Api<T>;

export function createSignal<T = unknown>(initalValue: T) {
  const node = new Api<T>(initalValue);
  return node as Node<T>;
}
