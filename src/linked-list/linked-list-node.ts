export default class LinkedListNode<T> {
  constructor(public value: T, public next: LinkedListNode<T> | null = null) {}

  toString(callback?: (value: T) => string): string {
    return callback ? callback(this.value) : `${this.value}`;
  }
}
