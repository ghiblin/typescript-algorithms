export type ComparatorFunction<T> = (a: T, b: T) => number;

function defaultCompareFunction<T>(a: T, b: T): number {
  if (a === b) {
    return 0;
  }

  return a < b ? -1 : 1;
}

export default class Comparator<T> {
  /**
   * Constructor
   * @param {ComparatorFunction} compare
   */
  constructor(
    private compare: ComparatorFunction<T> = defaultCompareFunction
  ) {}

  /**
   * Checks if two variables are equal.
   *
   * @param {T} a
   * @param {T} b
   * @returns {boolean}
   */
  equal(a: T, b: T): boolean {
    return this.compare(a, b) === 0;
  }

  /**
   * Checks if variable "a" is less than "b".
   *
   * @param {T} a
   * @param {T} b
   * @returns {boolean}
   */
  lessThan(a: T, b: T): boolean {
    return this.compare(a, b) < 0;
  }

  /**
   * Checks if variable "a" is greater than "b".
   * @param {*} a
   * @param {*} b
   * @return {boolean}
   */
  greaterThan(a: T, b: T): boolean {
    return this.compare(a, b) > 0;
  }

  /**
   * Checks if variable "a" is less than or equal to "b".
   * @param {*} a
   * @param {*} b
   * @return {boolean}
   */
  lessThanOrEqual(a: T, b: T): boolean {
    return this.lessThan(a, b) || this.equal(a, b);
  }

  /**
   * Checks if variable "a" is greater than or equal to "b".
   * @param {*} a
   * @param {*} b
   * @return {boolean}
   */
  greaterThanOrEqual(a: T, b: T): boolean {
    return this.greaterThan(a, b) || this.equal(a, b);
  }

  /**
   * Reverses the comparison order.
   */
  reverse(): void {
    const compareOriginal = this.compare;
    this.compare = (a: T, b: T) => compareOriginal(b, a);
  }
}
