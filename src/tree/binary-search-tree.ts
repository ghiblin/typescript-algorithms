import Comparator, { ComparatorFunction } from "../utils/comparator";
import BinarySearchTreeNode from "./binary-search-tree-node";

export default class BinarySearchTree<T> {
  private root: BinarySearchTreeNode<T>;

  constructor(nodeValueCompareFunction?: ComparatorFunction<T>) {
    this.root = new BinarySearchTreeNode<T>(null, nodeValueCompareFunction);
  }

  insert(value: T): BinarySearchTreeNode<T> {
    return this.root.insert(value);
  }

  contains(value: T): boolean {
    return this.root.contains(value);
  }

  remove(value: T): boolean {
    return this.root.remove(value);
  }

  toString(): string {
    return this.root.toString();
  }
}
