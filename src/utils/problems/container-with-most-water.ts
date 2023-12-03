import assert from "assert";
import { Problem } from "../Types/types";
import example1 from "../images/container-with-most-water-1.jpg";

export const containerWithMostWaterHandler = (fn: any) => {
  try {
    const tests = [
      [1, 8, 6, 2, 5, 4, 8, 3, 7],
      [1, 1],
      [2, 3, 4],
    ];
    const answers = [49, 1, 4];
    for (let i = 0; i < tests.length; i++) {
      const result = fn(tests[i]);
      assert.equal(result, answers[i]);
    }
    return true;
  } catch (error: any) {
    console.log("Error from containerWithMostWaterHandler: ", error);
    throw new Error(error);
  }
};

const starterCodeContainerWIthMostWaterJS = `function containerWithMostWater(height) {
  // Write your code here
};`;

export const containerWithMostWater: Problem = {
  id: "container-with-most-water",
  title: "6. Container With Most Water",
  problemStatement: `<p class='mt-3'>
    You are given an integer array <code>height</code> of length <code>n</code>.
    There are <code>n</code> vertical lines drawn such that the two endpoints
     of the <code>ith</code> line are <code>(i, 0)</code> and <code>(i, height[i])</code>.
  </p>
    <p class='mt-3'>
    Find two lines that together with the x-axis form a container, such that the container contains the most water.
    </p>
    <p class='mt-3'>
    Return the maximum amount of water a container can store.
    </p>
    <p class='mt-3'>
    <strong>Notice</strong> that you may not slant the container.
    </p>
  `,

  examples: [
    {
      id: 0,
      inputText: `height = [1,8,6,2,5,4,8,3,7]`,
      outputText: `49`,
      explanation:
        "The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.",
      img: example1.src,
    },
    {
      id: 1,
      inputText: `height = [1,1]`,
      outputText: `1`,
    },
  ],
  constraints: `<li class='mt-2'><code>n == height.length</code></li>
    <li class='mt-2'><code>2 <= n <= 10^5</code></li>
    <li class='mt-2'><code>0 <= height[i] <= 10^4</code></li>`,
  starterCode: starterCodeContainerWIthMostWaterJS,
  handlerFunction: containerWithMostWaterHandler,
  starterFunctionName: "function containerWithMostWater(",
  order: 6,
};
