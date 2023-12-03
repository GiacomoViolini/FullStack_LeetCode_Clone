import assert from "assert";
import { Problem } from "../Types/types";

export const subsetsHandler = (fn: any) => {
  try {
    const tests = [[1, 2, 3], [0]];
    const answers = [
      [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]],
      [[], [0]],
    ];
    for (let i = 0; i < tests.length; i++) {
      const result = fn(tests[i]);
      assert.equal(result, answers[i]);
    }
    return true;
  } catch (error: any) {
    console.log("Error from subsetsHandler: ", error);
    throw new Error(error);
  }
};

const starterCodeSubsetsJS = `function subsets(nums) {
  // Write your code here
};`;

export const subsets: Problem = {
  id: "subsets",
  title: "10. Subsets",
  problemStatement: `<p class='mt-3'>
    Given an integer array <code>nums</code> of <strong>unique</strong> elements, return all possible subsets(the power set).
  </p>
    <p class='mt-3'>
    The solution set <strong>must not</strong> contain duplicate subsets. Return the solution in <strong>any order</strong>.
    </p>
  `,

  examples: [
    {
      id: 0,
      inputText: `nums = [1,2,3]`,
      outputText: ` [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]`,
    },
    {
      id: 1,
      inputText: `nums = [0]`,
      outputText: ` [[],[0]]`,
    },
  ],
  constraints: `<li class='mt-2'><code>1 <= nums.length <= 10^4</code></li>
    <li class='mt-2'><code>0 <= nums[i] <= 10^5</code></li>`,
  starterCode: starterCodeSubsetsJS,
  handlerFunction: subsetsHandler,
  starterFunctionName: "function subsets(",
  order: 10,
};
