type Props<T> = { [K in keyof T]?: T[K] };

export default class DB<T> {
  /** The store of items */
  private items: T[];

  constructor(...items: T[]) {
    this.items = [...items];
  }

  /**
   * Find an item in the store that matches the given properties
   */
  where(props: Props<T>) {
    return this.items.find(item =>
      Object.keys(props).reduce(
        (acc, prop) => acc && item[prop] === props[prop],
        true
      )
    );
  }

  *[Symbol.iterator]() {
    for (let item of this.items) {
      yield item;
    }
  }
}
