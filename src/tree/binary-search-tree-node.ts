import Comparator, { ComparatorFunction } from "../utils/comparator";
import BinaryTreeNode from "./binary-tree-node";

export default class BinarySearchTreeNode<T> extends BinaryTreeNode<T> {
  // This comparator is used to compare node values with each other.
  private nodeValueComparator: Comparator<T>;

  constructor(
    value: T | null = null,
    private compareFunction?: ComparatorFunction<T>
  ) {
    super(value);

    this.nodeValueComparator = new Comparator(compareFunction);
  }

  insert(value: T): BinarySearchTreeNode<T> {
    if (this.nodeValueComparator.equal(this.value, null)) {
      this.value = value;

      return this;
    }

    if (this.nodeValueComparator.lessThan(value, this.value)) {
      // Insert to the left.
      if (this.left) {
        return (this.left as BinarySearchTreeNode<T>).insert(value);
      }

      const newNode = new BinarySearchTreeNode(value, this.compareFunction);
      this.setLeft(newNode);

      return newNode;
    }

    if (this.nodeValueComparator.greaterThan(value, this.value)) {
      // Insert to the right.
      if (this.right) {
        return (this.right as BinarySearchTreeNode<T>).insert(value);
      }

      const newNode = new BinarySearchTreeNode(value, this.compareFunction);
      this.setRight(newNode);

      return newNode;
    }

    return this;
  }

  find(value: T | null): BinarySearchTreeNode<T> | null {
    // Check the root.
    if (this.nodeValueComparator.equal(this.value, value)) {
      return this;
    }

    if (this.nodeValueComparator.lessThan(value, this.value) && this.left) {
      // Check left nodes.
      return (this.left as BinarySearchTreeNode<T>).find(value);
    }

    if (this.nodeValueComparator.greaterThan(value, this.value) && this.right) {
      // Check right nodes.
      return (this.right as BinarySearchTreeNode<T>).find(value);
    }

    return null;
  }

  contains(value: T | null): boolean {
    return !!this.find(value);
  }

  remove(value: T | null): boolean {
    const nodeToRemove = this.find(value);

    if (!nodeToRemove) {
      throw new Error("Item not found in the tree");
    }

    const { parent } = nodeToRemove;

    if (!nodeToRemove.left && !nodeToRemove.right) {
      // Node is a leaf and thus has no children.
      if (parent) {
        // Node has a parent. Just remove the pointer to this node from the parent.
        parent.removeChild(nodeToRemove);
      } else {
        // Node has no parent. Just erase current node value.
        nodeToRemove.setValue(null);
      }
    } else if (nodeToRemove.left && nodeToRemove.right) {
      // Node has two children.
      // Find the next biggest value (minimum value in the right branch)
      // and replace current value node with that next biggest value.
      const nextBiggerNode = (
        nodeToRemove.right as BinarySearchTreeNode<T>
      ).findMin();
      if (!this.nodeComparator.equal(nextBiggerNode, nodeToRemove.right)) {
        this.remove(nextBiggerNode.value);
        nodeToRemove.setValue(nextBiggerNode.value);
      } else {
        // In case if next right value is the next bigger one and it doesn't have left child
        // then just replace node that is going to be deleted with the right node.
        nodeToRemove.setValue(
          (nodeToRemove.right as BinarySearchTreeNode<T>).value
        );
        nodeToRemove.setRight(
          (nodeToRemove.right as BinarySearchTreeNode<T>).right
        );
      }
    } else {
      // Node has only one child.
      // Make this child to be a direct child of current node's parent.
      const childNode = (nodeToRemove.left ||
        nodeToRemove.right) as BinarySearchTreeNode<T>;

      if (parent) {
        parent.replaceChild(nodeToRemove, childNode);
      } else {
        BinaryTreeNode.copyNode(childNode, nodeToRemove);
      }
    }

    // Clear the parent of removed node.
    nodeToRemove.parent = null;

    return true;
  }

  /**
   * @return {BinarySearchTreeNode}
   */
  findMin(): BinarySearchTreeNode<T> {
    if (!this.left) {
      return this;
    }

    return (this.left as BinarySearchTreeNode<T>).findMin();
  }
}
