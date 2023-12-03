import assert from "assert";
import { Problem } from "../Types/types";
import example1 from "../images/maximum-depth-of-binary-tree1.jpg";

class Tree {
  value: number;
  left: Tree | null;
  right: Tree | null;

  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function createTree(values: (number | null)[]): Tree | null {
  if (values.length === 0) {
    return null;
  }

  const root = new Tree(values[0] as number);
  const queue: Tree[] = [root];

  for (let i = 1; i < values.length; i += 2) {
    const currentNode = queue.shift();

    if (values[i] !== null) {
      currentNode!.left = new Tree(values[i] as number);
      queue.push(currentNode!.left);
    }

    if (values[i + 1] !== null) {
      currentNode!.right = new Tree(values[i + 1] as number);
      queue.push(currentNode!.right);
    }
  }

  return root;
}

export const maximumDepthOfBinaryTreeHandler = (fn: any) => {
  try {
    const tests = [
      [3, 9, 20, null, null, 15, 7],
      [1, 1],
      [1, null, 2],
    ];
    const answers = [3, 2, 2];
    for (let i = 0; i < tests.length; i++) {
      const tree = createTree(tests[i]);
      const result = fn(tree);
      assert.equal(result, answers[i]);
    }
    return true;
  } catch (error: any) {
    console.log("Error from maximumDepthOfBinaryTreeHandler: ", error);
    throw new Error(error);
  }
};

const starterCodeMaximumDepthOfBinaryTreeJS = `/**
* Definition for a binary tree node.
* function TreeNode(val, left, right) {
*     this.val = (val===undefined ? 0 : val)
*     this.left = (left===undefined ? null : left)
*     this.right = (right===undefined ? null : right)
* }
*/
/**
function maxDepthOfBinaryTree(root) {
  // Write your code here
};`;

export const maximumDepthOfBinaryTree: Problem = {
  id: "maximum-depth-of-binary-tree",
  title: "8. Maximum Depth of Binary Tree",
  problemStatement: `<p class='mt-3'>
  Given the <code>root</code> of a binary tree, return its maximum depth.
  </p>
    <p class='mt-3'>
    A binary tree's <strong>maximum depth</strong> is the number of nodes along the longest path from the root node down to the farthest leaf node.
    </p>
  `,

  examples: [
    {
      id: 0,
      inputText: `root = [3,9,20,null,null,15,7]`,
      outputText: `3`,
      img: example1.src,
    },
    {
      id: 1,
      inputText: `height = [1,null,2]`,
      outputText: `2`,
    },
  ],
  constraints: `<li class='mt-2'><code>The number of nodes in the tree is in the range [0, 10^4].</code></li>
    <li class='mt-2'><code>-100 <= Node.val <= 100</code></li>`,
  starterCode: starterCodeMaximumDepthOfBinaryTreeJS,
  handlerFunction: maximumDepthOfBinaryTreeHandler,
  starterFunctionName: "function maxDepthOfBinaryTree(",
  order: 8,
};
