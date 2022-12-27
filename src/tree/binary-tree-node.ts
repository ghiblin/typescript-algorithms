import HashTable from "../hash-table/hash-table";
import Comparator, { ComparatorFunction } from "../utils/comparator";

export default class BinaryTreeNode<T> {
  protected left: BinaryTreeNode<T> | null = null;
  protected right: BinaryTreeNode<T> | null = null;
  protected parent: BinaryTreeNode<T> | null = null;

  // Any node related meta information may be stored here.
  protected meta = new HashTable<T>();
  protected _nodeComparator: Comparator<BinaryTreeNode<T>>;

  constructor(
    protected value: T | null,
    compareFunction?: ComparatorFunction<BinaryTreeNode<T>>
  ) {
    // This comparator is used to compare binary tree nodes with each other.
    this._nodeComparator = new Comparator(compareFunction);
  }

  get nodeComparator(): Comparator<BinaryTreeNode<T>> {
    return this._nodeComparator;
  }

  get height(): number {
    return Math.max(this.leftHeight, this.rightHeight);
  }

  get leftHeight(): number {
    if (!this.left) {
      return 0;
    }

    return this.left.height + 1;
  }

  get rightHeight(): number {
    if (!this.right) {
      return 0;
    }

    return this.right.height + 1;
  }

  get balanceFactor(): number {
    return this.leftHeight - this.rightHeight;
  }

  /**
   * Get parent's sibling if it exists.
   * @return {BinaryTreeNode}
   */
  get uncle(): BinaryTreeNode<T> | undefined {
    // Check if current node has parent.
    if (!this.parent) {
      return undefined;
    }

    // Check if current node has grand-parent.
    if (!this.parent.parent) {
      return undefined;
    }

    // Check if grand-parent has two children.
    if (!this.parent.parent.left || !this.parent.parent.right) {
      return undefined;
    }

    // So for now we know that current node has grand-parent and this
    // grand-parent has two children. Let's find out who is the uncle.
    if (this.nodeComparator.equal(this.parent, this.parent.parent.left)) {
      // Right one is an uncle.
      return this.parent.parent.right;
    }

    // Left one is an uncle.
    return this.parent.parent.left;
  }

  setValue(value: T | null): BinaryTreeNode<T> {
    this.value = value;

    return this;
  }

  setLeft(node: BinaryTreeNode<T> | null): BinaryTreeNode<T> {
    // Reset parent for left node since it is going to be detached.
    if (this.left) {
      this.left.parent = null;
    }

    // Attach new node to the left.
    this.left = node;

    // Make current node to be a parent for new left one.
    if (this.left) {
      this.left.parent = this;
    }

    return this;
  }

  setRight(node: BinaryTreeNode<T> | null): BinaryTreeNode<T> {
    // Reset parent for right node since it is going to be detached.
    if (this.right) {
      this.right.parent = null;
    }

    // Attach new node to the right.
    this.right = node;

    // Make current node to be a parent for new right one.
    if (this.right) {
      this.right.parent = this;
    }

    return this;
  }

  removeChild(nodeToRemove: BinaryTreeNode<T>): boolean {
    if (this.left && this.nodeComparator.equal(this.left, nodeToRemove)) {
      this.left = null;
      return true;
    }

    if (this.right && this.nodeComparator.equal(this.right, nodeToRemove)) {
      this.right = null;
      return true;
    }

    return false;
  }

  replaceChild(
    nodeToReplace: BinaryTreeNode<T>,
    replacementNode: BinaryTreeNode<T>
  ): boolean {
    if (!nodeToReplace || !replacementNode) {
      return false;
    }

    if (this.left && this.nodeComparator.equal(this.left, nodeToReplace)) {
      this.left = replacementNode;
      return true;
    }

    if (this.right && this.nodeComparator.equal(this.right, nodeToReplace)) {
      this.right = replacementNode;
      return true;
    }

    return false;
  }

  static copyNode<T>(
    sourceNode: BinaryTreeNode<T>,
    targetNode: BinaryTreeNode<T>
  ) {
    targetNode.setValue(sourceNode.value);
    targetNode.setLeft(sourceNode.left);
    targetNode.setRight(sourceNode.right);
  }

  traverseInOrder(): (T | null)[] {
    let traverse: (T | null)[] = [];

    // Add left node.
    if (this.left) {
      traverse = traverse.concat(this.left.traverseInOrder());
    }

    // Add root.
    traverse.push(this.value);

    // Add right node.
    if (this.right) {
      traverse = traverse.concat(this.right.traverseInOrder());
    }

    return traverse;
  }

  toString(): string {
    return this.traverseInOrder().toString();
  }
}
